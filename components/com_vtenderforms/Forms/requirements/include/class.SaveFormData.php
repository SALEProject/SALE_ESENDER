<?php
	defined('_JEXEC') or die;

	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";
	require_once($sqlMapperPath);

	class SaveFormToDB
	{
		var $formId;
		var $formArray;
		var $formLang;
		var $db;
		var $sqlMapper;

		// procesare
		function ProcessForm($post)
		{
			$this->formId = $post["nameForm"];
			$this->formLang = $post["langForm"];
			$this->db = JFactory::getDbo();
			$this->ProcessFormArray($post);
		}

		// salveaza in baza datele din form
		function Save($FormArray, $XMLFILE)
		{
			$this->db = JFactory::getDbo();
			$this->sqlMapper = new SQLMapper();
			$intID_Header = 0;
			$intID_Form = 0;
			$FormName = "";
			$FormDesc = "";

			// print_r($FormArray);

			$FirstElem = key($FormArray);
			$FormCode = substr($FirstElem, 0, strpos($FirstElem, "#"));

			try {
				// get data
				$prm1 = array();
				$prm1["@prm_Name"] = $FormCode;
				$query = $this->sqlMapper->getQuery("SAVEDB", "GetFormID", $prm1);
				$this->db->setQuery($query);
				$result1 = $this->db->loadObjectList();
				foreach($result1 as $row){
					$row = get_object_vars($row);
					$intID_Form = $row["ID"];
					$FormName = $row["Name"];
					$FormDesc = $row["Description"];
				}

				// header form
				$IDSave = $_POST["IdSave"];
				//$IDSave = $_GET["ID"];

				$lang = "EN";
				if(isset($_POST['langForm']) && ($_POST['langForm']!= ""))
					$lang = $_POST['langForm'];

				$db = JFactory::getDbo();
				$query = "SELECT * FROM `languages` WHERE CODE = '$lang'";
				$db->setQuery($query);
				$result = get_object_vars($db->loadObject());
				$langID = $result["ID"];

				$IdLanguage = $langID;

				$user = JFactory::getUser();

				$parh = array();
				$parh["@prm_ID_Form"] = $intID_Form;
				$parh["@prm_ID_User"] = $user->id;
				$parh["@prm_Form_Name"] = $FormName;
				$parh["@prm_Form_Date"] = '';
				$parh["@prm_Form_Desc"] = $FormDesc;
				$parh["@prm_XML_Path"] = $XMLFILE;
				$parh["@prm_ID_Save"] = $IDSave;
				$parh["@prm_ID_Language"] = $IdLanguage;


				if ($IDSave > 0) {
					$query = $this->sqlMapper->getQuery("SAVEDB", "exec_UpdFormHeader", $parh);
					$this->db->setQuery($query);
					$this->db->query();

					$intID_Header = $IDSave;
				} else {
					$query = $this->sqlMapper->getQuery("SAVEDB", "exec_InsertFormHeader", $parh);
					$this->db->setQuery($query);
					$this->db->query();

					$query = $this->sqlMapper->getQuery("SAVEDB", "GetID", $parh);
					$this->db->setQuery($query);
					$result1 = $this->db->loadObjectList();
					foreach($result1 as $row){
						$row = get_object_vars($row);
						$intID_Header = $row["ID"];
					}
				}

				$params = array();
				$params["@prm_ID_Header"] = $intID_Header;
				$params["@prm_ID_Ctl"] = '';
				$params["@prm_Val_Ctl"] = '';
				$params["@prm_Excel_Ctl_ID"] = "";

				$query = $this->sqlMapper->getQuery("SAVEDB", "exec_DelFormData", $params);
				$this->db->setQuery($query);
				$this->db->query();

				// campuri pe form
				foreach($FormArray as $key=>$value)
				{
					$params["@prm_ID_Ctl"] = $key;
					$params["@prm_Val_Ctl"] = $value;
					$params["@prm_Excel_Ctl_ID"] = "";

					$query = $this->sqlMapper->getQuery("SAVEDB", "exec_InsertFormData", $params);
					$this->db->setQuery($query);
					$this->db->query();
				}
				// $db->Exec("SAVEDB", "exec_Test", "");
			} catch (Exception $e) {
				echo 'Exceptie in baza de date: ', $e->getMessage(), "\n";
			}

			// $db.CloseConnection();
		}
	}
?>
