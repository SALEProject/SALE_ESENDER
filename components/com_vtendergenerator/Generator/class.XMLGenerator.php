<?php
	defined('_JEXEC') or die;
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";
	require_once($sqlMapperPath);
	$validateXMLPath = "components" . DS . "com_vtendergenerator" . DS . "Generator" . DS . "ValidateXML.php";
	require_once($validateXMLPath);

	class XMLGenerator{
		var $xml;
		var $xpath;
		var $db;
		var $sqlMapper;

		//-------attributes---------------------
		var $category;
		var $form;
		var $lang = "EN";	//have to be sent from FORM.
		var $version;
		var $joue_class;
		var $esender_login;
		var $customer_login;
		var $technical_email;
		var $content_email;
		var $nodoc;
		var $ctype;
		var $toJOUE;
		var $XML_File;


		function GetXMLFile()
		{
			if($this->XML_File != '')
			{
				return $this->XML_File;
			}
			else
				{
					return "XML error";
				}
		}

		function XMLGenerator(){
		// create new DOMDoc and XPATH
			$this->xml = new DOMDocument('1.0', 'UTF-8');
			$this->xml->formatOutput = true;
			$this->xpath = new DOMXPath($this->xml);
			$this->db = JFactory::getDbo();
			$this->sqlMapper = new SQLMapper();
			$this->setAttributes();
		}

		//added on 20130418 by Alex P
		//used in packsender to create the final xml
		function getGeneratedXML(){
			return $this->xml;
		}
		//---------------------------

		function setAttributes(){

			//include('../../Config/config.php');
			require_once("components" . DS . "com_vtenderutils" . DS . "Data" . DS . "config.php");
			global $vtender_config;

			$this->category = $vtender_config['category'];
			$this->version = $vtender_config['version'];
			$this->joue_class = $vtender_config['joue_class'];
			$this->esender_login = $vtender_config['esender_login'];
			//$this->customer_login = $vtender_config['customer_login'];
			$this->functional_email = $vtender_config['functional_email'];
			$this->technical_email = $vtender_config['technical_email'];
			$this->content_email = $vtender_config['content_email'];
			//$this->nodoc = $vtender_config['nodoc'];
			$this->nodoc = date("Y-mdH");

		}

		function createRoot(){
		//	create the root elemeent TED_ESENDERS with 2 attributes
			$root = $this->xml->createElement( "TED_ESENDERS" );
				$attr = $this->xml->createAttribute("xmlns:xsi");
				$attr->appendChild($this->xml->createTextNode("http://www.w3.org/2001/XMLSchema-instance"));
				$root->appendChild($attr);

				//$this->toJOUE = true;

				if(!$this->toJOUE){
					$attr = $this->xml->createAttribute("xmlns");
					$attr->appendChild($this->xml->createTextNode("http://publications.europa.eu/TED_schema/Reception"));
					$root->appendChild($attr);
				}

				$attr = $this->xml->createAttribute("xsi:noNamespaceSchemaLocation");
				if(!$this->toJOUE)
					$attr->appendChild($this->xml->createTextNode("TED_ESENDERS.xd"));
				else
					$attr->appendChild($this->xml->createTextNode("http://publications.europa.eu/TED_schema/Reception/R2.0.8.S02/TED_ESENDERS.xd"));

				$root->appendChild($attr);

			$this->xml->appendChild($root);
		}

		function createSender(){
		//	create the SENDER node
			$sender = $this->xml->createElement("SENDER");
				$login  = $this->xml->createElement("LOGIN");
					$attr = $this->xml->createAttribute("CLASS");
					$attr->appendChild($this->xml->createTextNode($this->joue_class));
					$login->appendChild($attr);
						$esender = $this->xml->createElement("ESENDER_LOGIN");
						$esender->appendChild($this->xml->createTextNode($this->esender_login));
					$login->appendChild($esender);
						$customer_login = $this->xml->createElement("CUSTOMER_LOGIN");
						$customer_login->appendChild($this->xml->createTextNode($this->customer_login));
				//$login->appendChild($customer_login);
				$user  = $this->xml->createElement("USER");
					$user_e_mails = $this->xml->createElement("USER_E_MAILS");
						$user_e_mail = $this->xml->createElement("USER_E_MAIL");
						$attr = $this->xml->createAttribute("TYPE");
						$attr->appendChild($this->xml->createTextNode("FUNCTIONAL"));
						$user_e_mail->appendChild($attr);
						$user_e_mail->appendChild($this->xml->createTextNode($this->functional_email));
					$user_e_mails->appendChild($user_e_mail);
					//$user_e_mails = $this->xml->createElement("USER_E_MAILS");
						$user_e_mail = $this->xml->createElement("USER_E_MAIL");
						$attr = $this->xml->createAttribute("TYPE");
						$attr->appendChild($this->xml->createTextNode("TECHNICAL"));
						$user_e_mail->appendChild($attr);
						$user_e_mail->appendChild($this->xml->createTextNode($this->technical_email));
					$user_e_mails->appendChild($user_e_mail);
						$user_e_mail = $this->xml->createElement("USER_E_MAIL");
						$attr = $this->xml->createAttribute("TYPE");
						$attr->appendChild($this->xml->createTextNode("CONTENT"));
						$user_e_mail->appendChild($attr);
						$user_e_mail->appendChild($this->xml->createTextNode($this->content_email));
					$user_e_mails->appendChild($user_e_mail);
				$user->appendChild($user_e_mails);
				$nodoc = $this->xml->createElement("NO_DOC_EXT");
				$nodoc->appendChild($this->xml->createTextNode($this->nodoc));
			$sender->appendChild($login);
			$sender->appendChild($user);
			$sender->appendChild($nodoc);
			$this->xml->documentElement->appendChild($sender);
		}

		function displayAndSaveXML(){
			// show result
			header('text/html; charset=UTF-8');
			// print $this->xml->saveXML();

			//$now_time = time();
			$str_timestamp = time(); //(string)$now_time;

			// $NameOfXMLFile = "XML" . DS . "writeF".$str_timestamp . ".xml";
			$NameOfXMLFile = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form" . $this->form . DS . "writeF".$this->form."_" . $str_timestamp . ".xml";
			$this->XML_File = $NameOfXMLFile;
			//$NameOfXMLFile = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form" . $this->form . DS . "writeF".$this->form. ".xml";

			$this->xml->save($NameOfXMLFile);

			echo "\n";
			if (ValidateXMLFileWithShowErrors($NameOfXMLFile) == 0)
			{
				$this->xml->saveXML();
				$successImg = "images" . DS . "Success.png";
				echo "	<div align='center' width='100%' height='300px'>
							<img src='$successImg' />
							<h1>Formularul dv. a fost salvat cu succes si va fi trimis catre JOUE in urmatorul pachet de date!</h1>
							<br/>
							<h2>Pentru vizualizarea fisierului xml, mergeti la acest <a href='components/com_vtenderforms/Forms/Form$this->form/writeF$this->form.xml'>link</a></h2>
					 	</div>";
				return 0;
			}
			else
			{
				return 1;
			}
		}

		function getFieldsIDS($fields){
			$ids = array();
			foreach($fields as $id=>$value){
				$parts = array();
				$parts = explode("#", $id);
				$ids[] = $parts[1];
			}
			return $ids;
		}

		function getPaths($ids){
			$paths = array();
			foreach($ids as $id){
				$params = array();
				$params["@prm_FIELD_CODE"] = $id;
				$params["@prm_FORM_CODE"] = "F".$this->form;
				//$result = $this->db->select("FIELDS", "select_FieldXPATHByCode", $params);
				$query = $this->sqlMapper->getQuery("FIELDS", "select_FieldXPATHByCode", $params);
				$this->db->setQuery($query);
				$results = $this->db->loadObjectList();
				foreach($results as $result){
					$result  = get_object_vars($result);
					$paths[] = $result['XPATH'];
				}
			}
			return $paths;
		}

		function getPathNodes($path){
			if(strcmp($path[0], "/") == 0){ //eliminate the slash from beggining
				$path[0] = "";
			}

			if(strcmp($path[strlen($path)-1], "/") == 0){ //eliminate the slash from end
				$path[strlen($path)-1] = "";
			}

			$path = str_replace("'/'", "", $path);
			$nodes = explode("/", $path);	//obtain the nodes

			return $nodes;
		}

		function getSpecialNodes($nodes){
			$specialNodes = array();
			for($i = 0; $i < count($nodes); $i++){
				$specialNodes[$i] = "";
				$params = array();
				$params["@prm_NAME"] = $nodes[$i];
				$query = $this->sqlMapper->getQuery("SPECIALNODES", "select_SpecialNodeByName", $params);
				$this->db->setQuery($query);
				$results = $this->db->loadObjectList();
				foreach($results as $result){
					$result = get_object_vars($result);
					$specialNodes[$i] = $result['ACTION'];
				}
			}

			return $specialNodes;
		}

		function verifyPath($path){	//this function verify if path exists. if $existentPath is false => the path does not exist.
			global $xpath;

			try{
				/*echo $path;
				echo "<br/>";*/
				$existentPath = $this->xpath->query($path)->item(0);
				//throw new Exception();
			}catch(Exception $e){
				echo $e->getMessage()." ".$path;
			}

			if(empty($existentPath))
				return false;
			else
				return true;
		}

		function buildPath($path, $nodeData){	//this function builds the path. Basically it adds the last node from the path.
			$nodes = array();
			$nodes = $this->getPathNodes($path);


			//$parentPath = $path;
			$parentPath = "/TED_ESENDERS";
			for($i = 1; $i < count($nodes)-1; $i++){
				$parentPath.= "/".$nodes[$i];
			} //ce cauta foreach-ul asta aici>?????


			$parent = $this->xpath->query($parentPath)->item(0);
			//$this->displayAndSaveXML();

			try{
				$newElement =  $this->xml->createElement(str_replace(" ", "", $nodes[count($nodes)-1]));
			}catch(Exception $e){
				echo $e->getMessage();
				/*echo "<br/>";
				echo str_replace(" ", "", $nodes[count($nodes)-1]);
				echo strlen($nodes[count($nodes)-1]);
				echo $nodes[count($nodes)-1][24];*/
			}

			if(is_array($nodeData)){
				if(array_key_exists("attributes", $nodeData)){
					foreach($nodeData["attributes"] as $attribute){
						$parts = explode("=", $attribute);
						$attr = $this->xml->createAttribute($parts[0]);
						$attr->appendChild($this->xml->createTextNode($parts[1]));
						$newElement->appendChild($attr);
					}
				}
				if(array_key_exists("value", $nodeData)){
					$string = $nodeData["value"];
					$string = preg_replace('/[\x00-\x1F\x80-\x9F]/u', '', $string);
					$newElement->appendChild($this->xml->createTextNode($string));

					/*$newElement->appendChild($this->xml->createTextNode($nodeData["value"]));*/
				}
			}

			//$parent->parentNode->insertBefore($newElement, $parent->nextSibling);	//insetAfter
			$parent->appendChild($newElement);
		}

		function processPath($path, $pathValue){

			$nodes = array();
			$specialNodes = array();	//$specialNodes key points towards nodes, and $specialNodes values points towards actions and data that should be applied to nodes
			$nodesData = array();
			$pathValueIsAttribute = 0;	//$pathValue can be assigned as attribute in the node or as text node. if 0 => $pathValue will be text node. if 1 => $pathValue will be attribute

			$nodes = $this->getPathNodes($path);
			$specialNodes = $this->getSpecialNodes($nodes);

			for($i = 0; $i < count($nodes); $i++){
				$nodesData[$i] = "";
				if($specialNodes[$i]!= ""){
					$actions = array();
					$actions = explode("&&", $specialNodes[$i]);
					foreach($actions as $action){
						$subaction = array();
						$subaction = explode(":", $action);

						if(strcmp($subaction[0], "DELETE") == 0){
							$elements = array();
							$elements = explode(";", $subaction[1]);
							foreach($elements as $element){
								$nodes[$i] = str_replace($element, "", $nodes[$i]);
							}
						}

						if(strcmp($subaction[0], "UNSET") == 0){
							array_pop($nodes);
						}

						if(strcmp($subaction[0], "ATTRIBUTES") == 0){
							$vals = array();
							$attributes = array();
							$attributes = explode(";", $subaction[1]);
							foreach($attributes as $attribute){
								if(strcmp($attribute, 'CATEGORY=CATEG') == 0)
									$attribute = str_replace('CATEGORY=CATEG', 'CATEGORY='.$this->category.'', $attribute);
								if(strcmp($attribute, 'FORM=NR') == 0)
									$attribute = str_replace('FORM=NR', 'FORM='.$this->form.'', $attribute);
								if(strcmp($attribute, 'LG=LANG') == 0)
									$attribute = str_replace('LG=LANG', 'LG='.$this->lang.'', $attribute);
								if(strcmp($attribute, 'VERSION=VER') == 0)
									$attribute = str_replace('VERSION=VER', 'VERSION='.$this->version.'', $attribute);
								if(strcmp($attribute, 'CTYPE=CTYPE') == 0)
									$attribute = str_replace('CTYPE=CTYPE', 'CTYPE='.$this->ctype.'', $attribute);
								if(strcmp($attribute, 'VALUE=VAL')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('VALUE=VAL', 'VALUE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'NOTICE=NOT')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('NOTICE=NOT', 'NOTICE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'CODE=COD')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('CODE=COD', 'CODE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'CURRENCY=CURR')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('CURRENCY=CURR', 'CURRENCY='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'PRICE=PRICE')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('PRICE=PRICE', 'PRICE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'PROCEDURE=PROC')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('PROCEDURE=PROC', 'PROCEDURE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'CLASS=CLASS')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('CLASS=CLASS', 'CLASS='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}
								if(strcmp($attribute, 'OBJECT=OBJ')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('OBJECT=OBJ', 'OBJECT='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}

								if(strcmp($attribute, 'CHOICE=CHO')== 0){
									$pathValueIsAttribute = 1;
									$attribute = str_replace('CHOICE=CHO', 'CHOICE='.$pathValue.'', $attribute);
									$i--;	//write attribute to the last parent before @value
								}

								$vals[] = $attribute;
							}
							$nodesData[$i]["attributes"] = $vals;
						}
					}
				}
			}

			if($pathValueIsAttribute == 0)
				$nodesData[count($nodes)-1]['value'] = $pathValue;

			$verifyPath = "/TED_ESENDERS";	//the basic xml path starts from TED_ESENDERS
			$pathLength = count($nodes);
			for($i = 1; $i < count($nodes); $i++){	//add every node one step at a time and verify if that path exists in xml (verifyPath($verifyPath)). If that path does not exists - go and build it.
				$nodeData = $nodesData[$i];

				$verifyPath.= "/".$nodes[$i];
				if(!$this->verifyPath($verifyPath)){	//verify if actual path exists
					$this->buildPath($verifyPath, $nodeData);	//if path does not exists, build it. $nodeValue is used only at the last node of the path
				//---------------------ADDED BY ALEX P. ON 20121109------------------------------------------------
				//The purpose of this block of code is to handle the attributes of nodes that are already generated.
				}elseif($i == count($nodes)-1){
					if($pathValueIsAttribute){
						$node = $this->xpath->query($verifyPath)->item(0);
						if($node->hasAttributes()){
							foreach($nodeData["attributes"] as $attribute){
								$parts = explode("=", $attribute);
								$attr = $node->getAttribute($parts[0]);
								if($attr == ""){
									$at = $this->xml->createAttribute($parts[0]);
									$at->appendChild($this->xml->createTextNode($parts[1]));
									$node->appendChild($at);
								}
							}
						}else{
							foreach($nodeData["attributes"] as $key=>$attribute){
								$parts = explode("=", $attribute);
								$at = $this->xml->createAttribute($parts[0]);
								$at->appendChild($this->xml->createTextNode($parts[1]));
								$node->appendChild($at);
							}
						}
					}
				}
				//--------------------------------------------------------------------------------------------------
			}
		}

		function setFORM($fields){
			foreach ($fields as $id=>$val){
				$parts = explode("#", $id);
				$this->form = str_replace("F", "", $parts[0]);
				//echo "this form". $this->form;
				break;
			}
		}

		function setCtype(){
			if(isset($_SESSION['CTYPE']))
				$this->ctype = strtoupper($_SESSION['CTYPE']);
		}

		function setLanguage($fields){
			foreach ($fields as $id=>$val){
				$parts = explode("#", $id);
				if(count($parts)>=4)
					$this->lang = strtoupper($parts[3]);
				//break;
			}
		}

		function generateXML($fields, $toJOUE = false){ //MAIN FUNCTION //$fields- Form x fields ID's with values
		//	generate the XML based on the $fields array
			$this->toJOUE = $toJOUE;
			$this->setLanguage($fields);
			$this->createRoot();
			$this->createSender();
			$this->setFORM($fields);	//it is used in FORM="nr". Ex.: FORM="3". $this->form contains online the number.
			$this->setCtype();
			$ids = array();
			$ids = $this->getFieldsIDS($fields);

			$paths = array();
			$paths = $this->getPaths($ids);

			$pathsAndValues = array();
			$initialFields = array();
			$initialFields = array_values($fields);
			for($i = 0; $i < count($paths); $i++){
				$pathsAndValues[$paths[$i]] = $initialFields[$i];
			}

			foreach($pathsAndValues as $path=>$value){
				$this->processPath($path, $value);
			}

			if($toJOUE == false)
				return $this->displayAndSaveXML();
		}
	}
?>
