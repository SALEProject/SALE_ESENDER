<?php
	defined('_JEXEC') or die;
	
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	require_once("class.DataGenerator.php");
	
	class FormGenerator{
		var $db;
		var $sqlMapper;
		var $formName;
		var $formID;		
		var $formSections;
		var $sectionsFields;
		var $sectionsHiddenFields;
		var $xml;
		var $xpath;
		var $lang;
		var $parentNode;
		var $containerName;
		var $tabNr;
		var $setModal;
		var $sectionWord;
		var $roman;
		
		function FormGenerator($formName, $lang){
			$this->formName = $formName;
			$this->lang = $lang;			
			$this->containerName = "container_".$this->lang;
			$this->db = JFactory::getDbo();
			$this->sqlMapper = new SQLMapper();
			$this->xml = new DOMDocument('1.0', 'utf-8');
			$this->xml->formatOutput = true;
			$this->xpath = new DOMXPath($this->xml);			
		}
		
		//--------------MAIN FUNCTION--------------
		function createForm(){
			$this->setModal = false;
			$this->formID = $this->getFormID($this->formName);
			$this->formSections = $this->getFormSections($this->formID);
			$this->sectionsFields = $this->getSectionsFields($this->formSections);			
			$this->sectionsHiddenFields = $this->getSectionsHiddenFields($this->formSections);					
			
			$container = $this->xml->createElement("div");
			$attr = $this->xml->createAttribute("id");
			$attr->appendChild($this->xml->createTextNode($this->containerName));
			$container->appendChild($attr);
			$attr = $this->xml->createAttribute("class");
			$attr->appendChild($this->xml->createTextNode($this->containerName));
			$container->appendChild($attr);
			$tabs = $this->xml->createElement("div");
			$attr = $this->xml->createAttribute("id");
			$attr->appendChild($this->xml->createTextNode("tabs"));
			$tabs->appendChild($attr);
			$attr = $this->xml->createAttribute("class");
			$attr->appendChild($this->xml->createTextNode("tabs"));
			$tabs->appendChild($attr);
			$tabs->appendChild($this->createUL());						
			$container->appendChild($tabs);						
			$this->xml->appendChild($container);
			$this->parentNode[] = $this->containerName;
			$this->parentNode[] = "tabs";			
			$this->createSections(0, $this->xml->documentElement);
			//$this->displayAndSaveXML();
			$this->saveXML();
			//return $this->xml;
		}
		
		function getFormID($formName){
			$formID = 0;
			$params = array();
			$params["@prm_Name"] = $formName;
			$query = $this->sqlMapper->getQuery("FORMS", "select_FormByName", $params);
			
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$formID = $result["ID"];
			
			return $formID;
		}
		
		function getFormSections($formID){
			$params = array();
			$sections = array();
			
			$params["@prm_ID"] = $formID;
			$params["@prm_LANG"] = "LANG_".$this->lang;
			$query = $this->sqlMapper->getQuery("FORMS", "select_FormSectionsByFormID", $params);									
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			/*while($row = mysql_fetch_assoc($result)){
				$sections[$row["SECTION_ID"]] = array("SECTION_PARENT"=>$row["SECTION_PARENT"], "SECTION_NAME"=>$row["SECTION_NAME"], "SECTION_CODE"=>$row["SECTION_CODE"], "SECTION_VISIBILITY"=>$row["SECTION_VISIBILITY"]);
			}*/
			
			foreach($results as $result){
				$result = get_object_vars($result);
				$sections[$result["SECTION_ID"]] = array("SECTION_ID"=>$result["SECTION_ID"], "SECTION_PARENT"=>$result["SECTION_PARENT"], "SECTION_NAME"=>$result["SECTION_NAME"], "SECTION_CODE"=>$result["SECTION_CODE"], "SECTION_VISIBILITY"=>$result["SECTION_VISIBILITY"], "SECTION_LABEL"=>$result["SECTION_LABEL"]);
			}
			
			return $sections;
		}
		
		function getSectionsFields($sections){			
			$fields = array();
			foreach($sections as $sectionKey => $sectionValue){
				$params = array();
				$params["@prm_ID"] = $sectionKey;
				$params["@prm_LANG"] = 'LANG_'.$this->lang;
				$query = $this->sqlMapper->getQuery("FIELDS", "select_FieldsBySectionID", $params);						

				$this->db->setQuery($query);
				$results = $this->db->loadObjectList();
				foreach($results as $result){
					$result = get_object_vars($result);
					if($result["FIELD_ID"]!= null)
						$fields[$sectionKey][] = array("FIELD_ID"=>$result["FIELD_ID"], "FIELD_CODE"=>$result["FIELD_CODE"], "FIELD_DESCRIPTION"=>$result["FIELD_DESCRIPTION"], 
													   "FIELD_LABEL"=>$result["FIELD_LABEL"], "FIELD_TYPE"=>$result["FIELD_TYPE"], "FIELD_MASK"=>$result["FIELD_MASK"],
													   "SELECT_TYPE"=>$result["SELECT_TYPE"], "FIELD_MINIMUM"=>$result["FIELD_MINIMUM"]
													   );
				}				
			}
			
			return $fields;
		}
		
		function getSectionsHiddenFields($sections){			
			$fields = array();
			foreach($sections as $sectionKey => $sectionValue){
				$params = array();
				$params["@prm_ID"] = $sectionKey;
				$params["@prm_LANG"] = 'LANG_'.$this->lang;
				$query = $this->sqlMapper->getQuery("FIELDS", "select_HiddenFieldsBySectionID", $params);		
					
				$this->db->setQuery($query);
				$results = $this->db->loadObjectList();
				foreach($results as $result){
					$result = get_object_vars($result);
					if($result["FIELD_ID"]!= null)
						$fields[$sectionKey][] = array("FIELD_ID"=>$result["FIELD_ID"], "FIELD_CODE"=>$result["FIELD_CODE"], "FIELD_DESCRIPTION"=>$result["FIELD_DESCRIPTION"], 
													   "FIELD_LABEL"=>$result["FIELD_LABEL"], "FIELD_TYPE"=>$result["FIELD_TYPE"], "FIELD_MASK"=>$result["FIELD_MASK"],
													   "SELECT_TYPE"=>$result["SELECT_TYPE"], "FIELD_MINIMUM"=>$result["FIELD_MINIMUM"]
													   );
				}				
			}
			
			return $fields;
		}
		
		function createUL(){
			$ul = $this->xml->createElement("ul");			
			$i = 0;
			$this->roman = array("1" => "I", "2" => "II", "3" => "III", "4" => "IV", "5" => "V", "6" => "VI", "7" => "VII", "8" => "VIII", "9" => "IX", "10" => "X");
			foreach($this->formSections as $section){
				if($section["SECTION_PARENT"] == 0){
					$i++;	
					$li = $this->xml->createElement("li");
						$a = $this->xml->createElement("a");
							$attr = $this->xml->createAttribute("href");
							$attr->appendChild($this->xml->createTextNode("#tabs-$i"));							
						$a->appendChild($attr);
						//$span = $this->xml->createElement("span");
						//$span->appendChild($this->xml->createTextNode($section["SECTION_NAME"]));
						//$a->appendChild($this->xml->createTextNode($section["SECTION_NAME"]));
						//$a->appendChild($this->xml->createTextNode($section["SECTION_NAME"]));
						$this->sectionWord = (strcmp($this->lang, "RO") == 0)?"Sectiunea ":"Section ";
						$a->appendChild($this->xml->createTextNode($this->sectionWord.$this->roman[$i]));
					$li->appendChild($a);
					$ul->appendChild($li);	
				}	
			}
			//$this->xml->appendChild($ul);
			return $ul;
		}
		
		function createSections($sectionID){			
			foreach($this->formSections as $sectionKey=>$sectionValue){									
				if($sectionValue["SECTION_PARENT"] == $sectionID)
				{													
					$query = "//*[@id=\"".$this->parentNode[count($this->parentNode)-1]."\"]";				
					//("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]")					
					//$query = "//*[contains(concat(' ', normalize-space(@class), ' '), '". $this->parentNode[count($this->parentNode)-1] ."')]";	
					$query = "//*[@class='" . $this->parentNode[count($this->parentNode)-1] . "']";	
					$parent = $this->xpath->query($query)->item(0);
					$newNode = $this->createNewSection($sectionValue);
					$parent->appendChild($newNode);
					array_push($this->parentNode, $sectionValue["SECTION_CODE"]);					
					$this->createSections($sectionKey);
				}
			}					
			
			if(array_key_exists($sectionID, $this->sectionsFields)){													
				$query = "//*[@id=\"".$this->parentNode[count($this->parentNode)-1]."\"]";				
				//$query = "//*[contains(concat(' ', normalize-space(@class), ' '), '". $this->parentNode[count($this->parentNode)-1] ."')]";	
				$query = "//*[@class='" . $this->parentNode[count($this->parentNode)-1] . "']";	
				$newParent = $this->xpath->query($query)->item(0);
				$newParent->appendChild($this->createFields($sectionID));
			}
			
			elseif(strcmp($this->parentNode[count($this->parentNode)-1], $this->containerName)!=0){	//remove div if has no childs.
				$query = "//*[@id=\"".$this->parentNode[count($this->parentNode)-1]."\"]";
				//$query = "//*[contains(concat(' ', normalize-space(@class), ' '), '".  $this->parentNode[count($this->parentNode)-1] ."')]";	
				$query = "//*[@class='" . $this->parentNode[count($this->parentNode)-1] . "']";	
				$node = $this->xpath->query($query)->item(0);
				//$node->parentNode->removeChild($node);
			}
			array_pop($this->parentNode);
		}
				
				
		function createNewSection($sectionValue){	
			$sectionDiv = $this->xml->createElement("div");
			$attr = $this->xml->createAttribute("id");
			$attr->appendChild($this->xml->createTextNode($sectionValue["SECTION_CODE"]));
																										
			if($sectionValue["SECTION_PARENT"] == 0){								
				/*$myFile = "testFile.txt";
				$fh = fopen($myFile, 'a') or die("can't open file");			
				$stringData = $sectionValue["SECTION_CODE"]."\n";
				fwrite($fh, $stringData);
				fclose($fh);*/
				
				$this->tabNr++;
				//$id = $sectionValue["SECTION_CODE"];
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode("tabs-".$this->tabNr));
				$sectionDiv->appendChild($attr);
			}
			$sectionDiv->appendChild($attr);
			$attr = $this->xml->createAttribute("class");
			$attr->appendChild($this->xml->createTextNode($sectionValue["SECTION_CODE"]));
			$sectionDiv->appendChild($attr);
			$attr = $this->xml->createAttribute("style");
			$sectionVisibility = "block";
			if(strcmp($sectionValue["SECTION_VISIBILITY"], "NO") == 0)
			{
				$sectionVisibility = "none";
 			$attr->appendChild($this->xml->createTextNode("display:".$sectionVisibility));
			}
			else
			if(strcmp($sectionValue["SECTION_VISIBILITY"], "DISABLED") == 0)
			{
				$sectionEnabled = "disabled";
				$attr->appendChild($this->xml->createTextNode("disabled:".$sectionEnabled));
			}									
			$sectionDiv->appendChild($attr);			
			
			$div = $this->xml->createElement("div");
			
			$sectionDescription = false;
			//added just for testing
			if(count($this->parentNode) == 1){
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("formSectionTitle"));
				$div->appendChild($attr);
				$sectionDescription = true;
			}
			
			if(count($this->parentNode) == 2){
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("formSectionSubTitle"));
				$div->appendChild($attr);
				$sectionDescription = true;
			}
			//
						
			if($sectionValue["SECTION_NAME"] == "###")
			{
				$div->appendChild($this->xml->createTextNode(""));
			}
			else
			{
				//added by Alex P. on 20130419
				if($sectionDescription==true){
					// icon-info-sign					
					$p = $this->xml->createElement("p");
						$attr = $this->xml->createAttribute("class");
						$attr->appendChild($this->xml->createTextNode("info"));
					$p->appendChild($attr);
					$span = $this->xml->createElement("span");
						$attr = $this->xml->createAttribute("class");
						$attr->appendChild($this->xml->createTextNode("icon-info-sign"));
					$span->appendChild($attr);	
					$span->appendChild($this->xml->createTextNode(""));					
					//$p->appendChild($span);
					//$p->appendChild($this->xml->createTextNode($sectionValue["SECTION_NAME"]));									
										
					//$p->appendChild($this->xml->createTextNode($sectionValue["SECTION_LABEL"]));									
					$p->appendChild($this->xml->createTextNode($this->sectionWord . $this->roman[$this->tabNr] . ": " . $sectionValue["SECTION_LABEL"]));
					$div->appendChild($p);
					
					$params = array();
					$params["@prm_ID"] = $sectionValue["SECTION_ID"];
					$params["@prm_LANG"] = "LANG_".$this->lang;
					$query = $this->sqlMapper->getQuery("FIELDS", "select_SectionDisclaimers", $params);

					$this->db->setQuery($query);					
					$results = $this->db->loadObjectList();
					if(!empty($results)){
						$disclaimerText = "";					
						foreach($results as $disclaimer){
							$disclaimer = get_object_vars($disclaimer);
							//$disclaimerText.= ($disclaimerText == "")?$disclaimer["TEXT"]:"<\n>".$disclaimer["TEXT"];						
							$disclaimerText = $disclaimer["TEXT"];						
						
							$p = $this->xml->createElement("p");
							$attr = $this->xml->createAttribute("class");
							$attr->appendChild($this->xml->createTextNode("warning"));
							$p->appendChild($attr);
							$p->appendChild($this->xml->createTextNode($disclaimerText));
							$div->appendChild($p);
						}	
					}
				}else{								
					$parts = explode(".", $sectionValue["SECTION_CODE"]);
					$cls = "sub";
					if(count($parts) > 2)
						$cls = "subsub";
						
					$p = $this->xml->createElement("pre");					
					$attr = $this->xml->createAttribute("class");
					$attr->appendChild($this->xml->createTextNode("$cls"));
					$p->appendChild($attr);
					//$p->appendChild($attr);
					
					//$p->appendChild($this->xml->createTextNode($sectionValue["SECTION_NAME"]."xyz"));				
					$p->appendChild($this->xml->createTextNode($sectionValue["SECTION_CODE"].") ".$sectionValue["SECTION_LABEL"]));				
					$br = $this->xml->createElement("br");
					$div->appendChild($br);
					$div->appendChild($br);
					$div->appendChild($p);
				}
				//--------------------------
				//$div->appendChild($this->xml->createTextNode($sectionValue["SECTION_NAME"]));
			}
					
			$sectionDiv->appendChild($div);			
					
			return $sectionDiv;
		}
		
		function createFields($sectionID){			
			$fields = $this->sectionsFields[$sectionID];									
			$fieldsNr = count($fields);			
			$rowsNr = intval($fieldsNr/2);
			$remainder = $fieldsNr%2;
			$index = 0;
			$table = $this->xml->createElement("table");			
			//added by Alex P. on 20130419
			$attr = $this->xml->createAttribute("class");
			$attr->appendChild($this->xml->createTextNode("table table-hover"));
			$table->appendChild($attr);
			//----------------------------
			for($i = 1; $i <= ($rowsNr + $remainder); $i++){
				$tr = $this->xml->createElement("tr");
				for($j = 0; $j < 2; $j++){			
					if(($i+$j+$index) > $fieldsNr)
						break;
					$td = $this->xml->createElement("td");
						$attr = $this->xml->createAttribute("width");
						$attr->appendChild($this->xml->createTextNode("25%"));
						//$attr->appendChild($this->xml->createTextNode("250px"));
						$td->appendChild($attr);
						//$td->appendChild($this->xml->createTextNode($fields[$i+$j]["FIELD_LABEL"]));	//LINIE CU PROBLEME
						$label = $this->createLabel($fields[$i+$j+$index-1]);
						$td->appendChild($label);
					$tr->appendChild($td);
					
					$td = $this->xml->createElement("td");
						$attr = $this->xml->createAttribute("width");
						$attr->appendChild($this->xml->createTextNode("25%"));
						//$attr->appendChild($this->xml->createTextNode("250px"));						
						$td->appendChild($attr);
						$field = $this->createField($fields[$i+$j+$index-1]);		//LINIE CU PROBLEME
						$td->appendChild($field);						
					$tr->appendChild($td);
				}
				$table->appendChild($tr);
				$index++;
			}			
			
			$sectionDiv = $this->xml->createElement("div");
			$sectionDiv->appendChild($table);
									
			//if(count($hiddenFields) > 0){
			if(array_key_exists($sectionID, $this->sectionsHiddenFields) && (count($this->sectionsHiddenFields[$sectionID]) > 0)){
				$hiddenFields = $this->sectionsHiddenFields[$sectionID];
				$divHiddenFields = $this->xml->createElement("div");
				for($i = 0; $i < count($hiddenFields); $i++){
					$field = $this->createField($hiddenFields[$i]);
					$divHiddenFields->appendChild($field);
				}
				$sectionDiv->appendChild($divHiddenFields);
			}					
			
			//return $table;
			return $sectionDiv;
		}
		
		function createLabel($field){			
			$fieldCODE = $field["FIELD_CODE"];	 
			$fieldLABEL = $field["FIELD_LABEL"];	 
			$fieldMinimum = $field["FIELD_MINIMUM"];			
			$label = $this->xml->createElement("div");				
				//------attribute class--------------
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode($fieldCODE));
				$label->appendChild($attr);
				$label->appendChild($this->xml->createTextNode($fieldLABEL));
				if(strcmp(strtoupper($fieldMinimum), "YES") == 0){
					/*$paragraph = $this->xml->createElement("p");
					$attr = $this->xml->createAttribute("style");
					$attr->appendChild($this->xml->createTextNode("color:red"));
					$paragraph->appendChild($attr);
					$paragraph->appendChild($this->xml->createTextNode("***"));					
					$label->appendChild($paragraph);				*/
					$label->appendChild($this->xml->createTextNode(" "));
					$span = $this->xml->createElement("span");
						$attr = $this->xml->createAttribute("class");
						$attr->appendChild($this->xml->createTextNode("icon-star"));					
					$span->appendChild($attr);
						$attr = $this->xml->createAttribute("style");
						$attr->appendChild($this->xml->createTextNode("color:red"));
					$span->appendChild($attr);
					$label->appendChild($span);
				}
				
			return $label;
		}
		
		function createField($field){
			$createdField = "";
			$fieldType = $field["FIELD_TYPE"];
			
			//Approved field types:
			//1. string
			//2. selection
			//3. text
			//4. numeric

			switch(strtoupper($fieldType)){
				case "STRING":		$createdField = $this->createTextBox($field); 
									break; 
								
				case "SELECTION":	$createdField = $this->createSelection($field);
									return $createdField;
									break;
			
				case "TEXT":		$createdField = $this->createTextarea($field);
									break;
								
				case "NUMERIC":		$createdField = $this->createTextBox($field);
									break;		
									
				default:			$createdField = $this->xml->createElement("div");									
			}
			
			return $createdField;
		}

		
		function createTextBox($field){			
			$fieldID = $field["FIELD_ID"];			
			$fieldMask = $field["FIELD_MASK"];
			$fieldCode = $field["FIELD_CODE"];
			$fieldMinimum = $field["FIELD_MINIMUM"];
			$fieldDescription = $field["FIELD_DESCRIPTION"];			
			$fieldLabel = $field["FIELD_LABEL"];
			$fieldDescription = str_replace(" ", "", $fieldDescription);
			$fieldName = $this->formName."#".$fieldCode."#".$fieldDescription."#".$this->lang;			
			$required = (strcmp(strtoupper($fieldMinimum), "YES") == 0) ? " required" : "";
			$dispatchDate = ((strcmp(strtoupper($fieldLabel), strtoupper("Date of dispatch of this notice")) == 0) || (strcmp(strtoupper($fieldLabel), strtoupper("Data expedierii prezentului anunt")) == 0)) ? " dispatchDate" : "";
			
			
			$input = $this->xml->createElement("input");
				//------attribute type--------------
				$attr = $this->xml->createAttribute("type");
				$type = "text";
				if(strcmp(strtoupper($fieldMask), "HIDDEN") == 0)
					$type = "hidden";
					
				//$attr->appendChild($this->xml->createTextNode("text"));
				$attr->appendChild($this->xml->createTextNode($type));
				$input->appendChild($attr);				
				//------attribute class--------------
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode($fieldMask.$required.$dispatchDate));
				$input->appendChild($attr);				
				//------attribute id--------------
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode($fieldCode));
				$input->appendChild($attr);
				//------attribute name--------------
				$attr = $this->xml->createAttribute("name");
				$attr->appendChild($this->xml->createTextNode($fieldName));
				$input->appendChild($attr);
				//------attribute value--------------
				$attr = $this->xml->createAttribute("value");
				//$attr->appendChild($this->xml->createTextNode(""));
				$data = new DataGenerator($field);				
				$attr->appendChild($this->xml->createTextNode($data->fieldValue));
				$input->appendChild($attr);
				
				/*if(strcmp(strtoupper($fieldMask), "DATE") == 0){
					$span = $this->xml->createElement("span");
					$attr = $this->xml->createAttribute("class");
					$attr->appendChild($this->xml->createTextNode("icon-calendar"));
					$span->appendChild($attr);
					$input->appendChild($span);
				}*/
					
				
			return $input;			
		}
		
		
		function createTextarea($field){
			$fieldID = $field["FIELD_ID"];			
			$fieldMask = $field["FIELD_MASK"];
			$fieldCode = $field["FIELD_CODE"];
			$fieldMinimum = $field["FIELD_MINIMUM"];
			$fieldDescription = $field["FIELD_DESCRIPTION"];
			$fieldDescription = str_replace(" ", "", $fieldDescription);
			$fieldName = $this->formName."#".$fieldCode."#".$fieldDescription."#".$this->lang;
			$required = (strcmp(strtoupper($fieldMinimum), "YES") == 0) ? " required" : "";
			
			$textarea = $this->xml->createElement("textarea");							
				//------attribute class--------------
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("textarea".$required));
				$textarea->appendChild($attr);
				//------attribute id--------------
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode($fieldCode));
				$textarea->appendChild($attr);
				//------attribute name--------------
				$attr = $this->xml->createAttribute("name");
				$attr->appendChild($this->xml->createTextNode($fieldName));
				$textarea->appendChild($attr);
				//------attribute rows--------------
				$attr = $this->xml->createAttribute("rows");
				$attr->appendChild($this->xml->createTextNode("5"));
				$textarea->appendChild($attr);
				//------attribute cols--------------
				$attr = $this->xml->createAttribute("cols");
				$attr->appendChild($this->xml->createTextNode("20"));
				$textarea->appendChild($attr);
			//$textarea->appendChild($this->xml->createTextNode(""));
			$data = new DataGenerator($field);
			$textarea->appendChild($this->xml->createTextNode($data->fieldValue));
			return $textarea;			
		}
		
		function createSelection($field){			
			$fieldID = $field["FIELD_ID"];			
			$fieldMask = $field["FIELD_MASK"];
			$fieldCode = $field["FIELD_CODE"];
			$fieldMinimum = $field["FIELD_MINIMUM"];
			$fieldSelectType = $field["SELECT_TYPE"];
			$fieldDescription = $field["FIELD_DESCRIPTION"];
			$fieldDescription = str_replace(" ", "", $fieldDescription);
			$required = (strcmp(strtoupper($fieldMinimum), "YES") == 0) ? " required" : "";
			
			$fieldName = $this->formName."#".$fieldCode."#".$fieldDescription."#".$this->lang;
			
			//added on 20130417 by Alex P.
			//cpv select becomes input type text
			//nuts
			//----------------------------------------------------------------------------------------------------------------------
			$params = array();
			$params["@prm_ID"] = $fieldID;
			$query = $this->sqlMapper->getQuery("FIELDS", "select_FieldInfosByID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$labelCode = $result["LABEL_CODE"];
			
			if((strpos($labelCode, "cpv_")!== false) || (strpos($labelCode, "nuts")!== false)) {	//cpv_supp->lim or cpv_supplimentaire ???						
				$params = array();
				$params["@prm_ID"] = $fieldID;
				$query = $this->sqlMapper->getQuery("FIELDS", "select_cpvtype", $params);
				$this->db->setQuery($query);
				$result = get_object_vars($this->db->loadObject());
				
				$cpvType = $result["CODE"];
				$cpvType = str_replace(" ", "", $cpvType);				
				$cpvType = str_replace("IN(", "", $cpvType);
				$cpvType = str_replace(")", "", $cpvType);				
				
				$div = $this->xml->createElement("div");
				$select = $this->xml->createElement("input");	
				//------attribute class--------------
				$attr = $this->xml->createAttribute("type");
				$attr->appendChild($this->xml->createTextNode("text"));
				$select->appendChild($attr);				
				//------attribute id----------------
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode($fieldCode));
				$select->appendChild($attr);
				//------attribute name--------------
				$attr = $this->xml->createAttribute("name");
				$attr->appendChild($this->xml->createTextNode($fieldName));
				$select->appendChild($attr);
				//------attribute value--------------
				$attr = $this->xml->createAttribute("value");
				$attr->appendChild($this->xml->createTextNode(""));
				$select->appendChild($attr);
				//------attribute disabled--------------
				$attr = $this->xml->createAttribute("readonly");
				$select->appendChild($attr);				
				
				$div->appendChild($select);
				$a = $this->xml->createElement("a");
				$attr = $this->xml->createAttribute("href");				

				/*if(strcmp(strtoupper($cpvType), "CPV_MAIN") == 0)
					$attr->appendChild($this->xml->createTextNode("index.php?option=com_vtenderforms&utils=cpv_main&format=raw&field=$fieldCode"));
				else
					$attr->appendChild($this->xml->createTextNode("index.php?option=com_vtenderforms&utils=cpv_supplimentary&format=raw&field=$fieldCode"));				*/
					
				if(strcmp(strtoupper($cpvType), "CPV_MAIN") == 0)
					$attr->appendChild($this->xml->createTextNode("index.php?option=com_vtenderforms&utils=cpv_main&format=raw&field=$fieldCode"));
				elseif(strcmp(strtoupper($cpvType), "CPV_SUPPLIMENTARY") == 0)
					$attr->appendChild($this->xml->createTextNode("index.php?option=com_vtenderforms&utils=cpv_supplimentary&format=raw&field=$fieldCode"));
				else
					$attr->appendChild($this->xml->createTextNode("index.php?option=com_vtenderforms&utils=nuts&format=raw&field=$fieldCode"));
					
				$a->appendChild($attr);
				
				$attr = $this->xml->createAttribute("rel");
				//$attr->appendChild($this->xml->createTextNode("{handler: 'iframe', size: {x: 500, y: 400}}"));
				$attr->appendChild($this->xml->createTextNode("{size: {x: 800, y: 600}}"));
				$a->appendChild($attr);
				
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("modal"));
				$a->appendChild($attr);	
				
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode("code_".$fieldCode));
				$a->appendChild($attr);	
				
				$span = $this->xml->createElement("span");
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("icon-search"));
				$span->appendChild($attr);
				
				$a->appendChild($span);				
				
				$div->appendChild($a);
											
				
				if(!$this->setModal){					
					$doc = JFactory::getDocument();
					//$js = 'function writepostback(postback){ document.getElementById("' . $fieldCode . '").value = postback; }';
					$js = 'function writepostback(id, codeValue, codeName){ 
								document.getElementById(id).value = codeValue; 																
								//$("#" + id).val(codeValue);
								var href = document.getElementById("code_" + id).href; 
								if(href.indexOf("codeValue")>= 0){	
									var parts = href.split("&codeValue");
									href = parts[0];
									href = href + "&codeValue=" + codeValue;									
								}else
									href = href + "&codeValue=" + codeValue;	
									
								document.getElementById("code_" + id).href = href;
						   }';
					$doc->addScriptDeclaration($js);
					JHTML::_('behavior.modal', 'a.modal', $params);
					$this->setModal = true;
				}
			
				return $div;
			}
			//--------------------------------------------------------------------------------------------------------------------------------


			
			$select = $this->xml->createElement("select");	
				//------attribute class--------------
				$attr = $this->xml->createAttribute("class");
				$attr->appendChild($this->xml->createTextNode("selection".$required));
				$select->appendChild($attr);				
				//------attribute id----------------
				$attr = $this->xml->createAttribute("id");
				$attr->appendChild($this->xml->createTextNode($fieldCode));
				$select->appendChild($attr);
				//------attribute name--------------
				$attr = $this->xml->createAttribute("name");
				$attr->appendChild($this->xml->createTextNode($fieldName));
				$select->appendChild($attr);
				//------options---------------------
				$params = array();
				$params["@prm_ID"] = $fieldID;
				$params["@prm_LANG"] = "CONTENT_" . $this->lang;
				$isSimpleSelect = false;
				if((strcmp($fieldSelectType, "S3") == 0) || (strcmp($fieldSelectType, "") == 0)){
					$query = $this->sqlMapper->getQuery("FIELDS", "select_SimpleSelectOptionsByFieldID", $params);
					$isSimpleSelect = true;
				}
				else
					$query = $this->sqlMapper->getQuery("FIELDS", "select_SpecialSelectOptionsByFieldID", $params);							
					
				$this->db->setQuery($query);				
				$rows = $this->db->loadObjectList();
				//-----------------------blank option--------------------------------------------
				$option = $this->xml->createElement("option");
				$attr = $this->xml->createAttribute("value");				
				$option->appendChild($attr);
				$option->appendChild($this->xml->createTextNode(""));
				$select->appendChild($option);						
				//-------------------------------------------------------------------------------
				foreach($rows as $row){					
					$row = get_object_vars($row);					
					$option = $this->xml->createElement("option");					
					if($isSimpleSelect){
						$attr = $this->xml->createAttribute("id");
						$attr->appendChild($this->xml->createTextNode($this->formName."#".$fieldCode."#".$fieldDescription."#".$this->lang));
						$option->appendChild($attr);
						
						$attr = $this->xml->createAttribute("value");
						$attr->appendChild($this->xml->createTextNode($row["VALUE_OPTION"]));
						$option->appendChild($attr);					
					}else{
						$attr = $this->xml->createAttribute("id");
						$attr->appendChild($this->xml->createTextNode($row["ID_OPTION"]));
						$option->appendChild($attr);
						
						$attr = $this->xml->createAttribute("value");
						$attr->appendChild($this->xml->createTextNode($row["VALUE_OPTION"]));
						$option->appendChild($attr);											
					}
					
					$option->appendChild($this->xml->createTextNode($row["TEXT_OPTION"]));
					$select->appendChild($option);
				}							
			return $select;			
		}
				
		function saveXML(){
			// show result
			$this->xml->saveXML($this->xml->documentElement);
			//$this->xml->save("form".$this->lang.".html");
			$this->xml->save("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form" . str_replace("F", "", $this->formName) . DS . "form" . $this->lang . ".html");
		}		
				
		function displayAndSaveXML(){
			// show result
			header('Content-Type: text/plain');
			print $this->xml->saveXML($this->xml->documentElement);
			$this->xml->save("form.html");
		}
	}
?>