<?php
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	
	$xmlGeneratorPath = "components" . DS . "com_vtendergenerator" . DS . "Generator" . DS . "class.XMLGenerator.php";
	require_once($xmlGeneratorPath);
	
	class PrepareXML{
		var $sqlMapper;
		var $saveID;
		var $db;
		var $xmlGenerator;
		
		function PrepareXML($saveID){
			$this->saveID = $saveID;
			$this->sqlMapper = new sqlMapper();			
			$this->db = JFactory::getDbo();
			$this->xmlGenerator = new XMLGenerator();
			$this->prepare();
		}
		
		//let's cook it!
		function prepare(){
			
			//---------------------parent xml ---------------------------------------------------------------------
			$params = array();
			$params["@prm_ID_Header"] = $this->saveID;			
			//$params["@prm_ID_Header"] = 500;			
			$query = $this->sqlMapper->getQuery("SAVEDB", "select_save", $params);
			
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$dataArray = array();
			foreach($results as $row){
				$row = get_object_vars($row);				
				$key = $row["IDCtlOriginal"];
				$value = $row["Val_Ctl"];
				$dataArray[$key] = $value;				
			}
			
			$this->xmlGenerator->generateXML($dataArray, $toJOUE = true);
			$xml1 = $this->xmlGenerator->getGeneratedXML();					
			
			$xmlName1 = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "PackSender" . DS . "xml" . DS . "xml" . DS . "temp1" . Date("dmYHis") . rand(0,10000) . "_" . $this->saveID . ".xml";			
			$xml1->save($xmlName1);
			//------------------------------------------------------------------------------------------------------
			
			//--------------------child xml-------------------------------------------------------------------------
			$params = array();
			$params["@prm_ID_Header"] = $this->saveID;			
			//$params["@prm_ID_Header"] = 500;
			$query = $this->sqlMapper->getQuery("SAVEDB", "select_childHeader", $params);
			
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			if(!empty($results)){	//meaning that maybe there is no child xml!!!!!
				$dataArray = array();
				foreach($results as $row){
					$row = get_object_vars($row);
					$key = $row["IDCtlOriginal"];
					$value = $row["Val_Ctl"];
					$dataArray[$key] = $value;				
				}
				
				$this->xmlGenerator = new XMLGenerator();
				$this->xmlGenerator->generateXML($dataArray, $toJOUE = true);
				$xml2 = $this->xmlGenerator->getGeneratedXML();				
				
				$xmlName2 = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "PackSender" . DS . "xml" . DS . "xml" . DS . "temp2" . Date("dmYHis") . rand(10001, 20000) . "_" . $this->saveID . ".xml";			
				$xml2->save($xmlName2);
				
				//------------------------------------------------------------------------------------------------------
							
				//---------------------append child to parent, save it and then delete initial parent and child----------
				$orgdoc = new DOMDocument();
				$orgdoc->load($xmlName2);
				foreach ($orgdoc->getElementsByTagName('FORM_SECTION')->item(0)->childNodes as $node) {
					if ($node->nodeType === XML_ELEMENT_NODE) {
						$formSection = $node;
					}
				}			
				
				$newdoc = new DOMDocument();
				$newdoc->load($xmlName1);			
				$newdoc->formatOutput = true;
				
				$formSection = $newdoc->importNode($formSection, true);
				$newdoc->getElementsByTagName('FORM_SECTION')->item(0)->appendChild($formSection);			
				
				$xmlName3 = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "PackSender" . DS . "xml" . DS . "xml" . DS . "temp3" . Date("dmYHis") . rand(20001, 30000) . "_" . $this->saveID . ".xml";			
				$newdoc->saveXML();
				$newdoc->save($xmlName3);
				
				unlink($xmlName1);
				unlink($xmlName2);								
				//------------------------------------------------------------------------------------------------------
			}
			
			//---------------------update JOUEReady---------------------------------------------------------------------
			$params = array();
			$params["@prm_ID"] = $this->saveID;
			$query = $this->sqlMapper->getQuery("PACKSEND", "update_JOUEReady", $params);
			$this->db->setQuery($query);
			$this->db->query();
		}
	}
?>