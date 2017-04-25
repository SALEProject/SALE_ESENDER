<?php
	defined('_JEXEC') or die;
	
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	
	
	class DataGenerator{
		var $fieldValue;
		var $db;
		var $sqlMapper;
		var $field;
		
		function DataGenerator($field)	{
			return "";	//added on 20130418 by Alex P.
			$this->db = JFactory::getDbo();
			$this->sqlMapper = new SQLMapper();

			$this->field = $field;			
			$this->fieldValue = $this->createFieldValue();	
			//return "";
			$this->fieldValue = str_replace("\n", " ", $this->fieldValue);
			$this->fieldValue = str_replace("\r", " ", $this->fieldValue);
			return $this->fieldValue;
		}		
		
		function createFieldValue(){
			if(empty($this->field["FIELD_MINIMUM"]))
				return "";
			
			$fieldMask = "";	
			$fieldValue = "";
			
			$params = array();
			$params["@prm_ID"] = $this->field["FIELD_ID"];			
			$query = $this->sqlMapper->getQuery("FIELDS", "select_FieldInfoByID", $params);
			
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();			
			
			foreach($results as $result){
				$result = get_object_vars($result);
				$fieldMask = $result["MASK"];
			}
			
			if(strcmp(strtoupper($fieldMask), "OFFICIAL_NAME") == 0)				
				$fieldValue = $this->createOfficialName();
			elseif(strcmp(strtoupper($fieldMask), "NATIONAL_ID") == 0)
				$fieldValue = rand(124321839, 364891060);
			elseif(strcmp(strtoupper($fieldMask), "ADDRESS") == 0)
				$fieldValue = $this->createAddress();
			elseif(strcmp(strtoupper($fieldMask), "TOWN") == 0)
				$fieldValue = $_SESSION["DATA_GENERATOR"]["CITY"];
			elseif(strcmp(strtoupper($fieldMask), "POSTAL_CODE") == 0)
				$fieldValue = rand(73001, 78536);
			elseif(strcmp(strtoupper($fieldMask), "ATTENTIONOF") == 0)
				$fieldValue = $this->createName();
			elseif(strcmp(strtoupper($fieldMask), "E-MAIL") == 0)
				$fieldValue = $this->createEmail();				
			elseif(strcmp(strtoupper($fieldMask), "PHONE") == 0)
				$fieldValue = "+40 7".rand(2,6).rand(0,9).rand(101068, 963482); //+40 720 123748
			elseif(strcmp(strtoupper($fieldMask), "FAX") == 0)
				$fieldValue = "+40 ".rand(2,3).rand(1,9).rand(312016, 463871); //+40 720 123748
			elseif(strcmp(strtoupper($fieldMask), "URL") == 0)
				$fieldValue = $this->createURL();							
			elseif(strcmp(strtoupper($fieldMask), "TITLE_CONTRACT") == 0)
				$fieldValue = $this->createContractTitle();		
			elseif(strcmp(strtoupper($fieldMask), "CONTRACT_DESCRIPTION") == 0)
				$fieldValue = $_SESSION["DATA_GENERATOR"]["CONTRACT_DESCRIPTION"];	
			elseif(strcmp(strtoupper($fieldMask), "ADDITIONAL_INFO") == 0)
				$fieldValue = $_SESSION["DATA_GENERATOR"]["CONTRACT_ADDITIONAL_INFO"];	
			elseif(strcmp(strtoupper($fieldMask), "COST") == 0)
				$fieldValue = rand(100235, 1035897);
			elseif(strcmp(strtoupper($fieldMask), "DEPOSITS") == 0)
				$fieldValue = $this->createDeposit();
			elseif(strcmp(strtoupper($fieldMask), "AWARD_CRITERIA") == 0)
				$fieldValue = $this->createAward();
			else
				$fieldValue = "";
			
			return $fieldValue;			
		}
		
		function createOfficialName(){						
			$params = array();
			$params["@prm_TABLE"] = "data_officialnames";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			$params = array();
			$params["@prm_ID"] = rand(1, $max);
			$query = $this->sqlMapper->getQuery("OFFICIALNAMES", "select_OfficialNameByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$officialName = "4E SOFTWARE";
			foreach($results as $result){
				$result = get_object_vars($result);
				$officialName = $result["NAME"];
			}
			
			$_SESSION["DATA_GENERATOR"]["OFFICIAL_NAME"] = $officialName;
			
			
			$rand = rand(1, 6);
			$officialName = strtoupper($officialName);
			if($rand == 1)
				$officialName = "SC. ".$officialName." S.R.L.";
			if($rand == 2)
				$officialName = $officialName." S.A.";
			if($rand == 3)
				$officialName = "S.C. ".$officialName." S.R.L.";
			if($rand == 4)
				$officialName = $officialName." SA.";					
			if($rand == 5)
				$officialName = "SC. ".$officialName." SRL.";
			if($rand == 6)
				$officialName = $officialName." SA";	
			
			return $officialName;
			//echo "<script type='text/javascript'>alert('".$max."');</script>";
		}
		
		function createAddress(){
			//We can have different address types. Examples:
			//1. Romania: Strada/Calea/Aleea Industriilor 134 Dolj 2000515 Craiova
			//2. Norvegia: Nedre Hagali 4 PB 208 2718 Brandbu
			//3. Germania: Am Finkenflug 5-7 99869 Schwabhausen
			//4. Finlanda: Teollisuuspuisto 25570 Teijo
			//5. Franta: 139 Avenue De Verdun 92130 Issy Les Moulineaux
			
			$address = "";
			$alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
			$streetTypes = array("Street", "Entrance", "Boulevard", "Blv.", "Str.");			
			$addressType = rand(1, 5);
			$streetType = $streetTypes[rand(0, 4)];
			
			$max = $this->db->lastID("data_streets");
			$rand = rand(1, (int)$max);
			$params = array();
			$params["@prm_ID"] = $rand;			
			$result = $this->db->select("STREETS", "select_StreetByID", $params);
			$query = $this->sqlMapper->getQuery("STREETS", "select_StreetByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$street = "Traian";
			foreach($results as $result){
				$result = get_object_vars($result);
				$street = $result["STREET"];
			}
			$params = array();
			$params["@prm_TABLE"] = "data_cities";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			$rand = rand(1, (int)$max);
			$params = array();
			$params["@prm_ID"] =  $rand;
			$result = $this->db->select("CITIES", "select_CityByID", $params);
			$query = $this->sqlMapper->getQuery("CITIES", "select_CityByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();			
			$city = "Bucuresti";
			foreach($results as $result){
				$result = get_object_vars($result);
				$city = $result["CITY"];
			}
			
			$_SESSION["DATA_GENERATOR"]["CITY"] = $city;
						
			$params = array();
			$params["@prm_TABLE"] = "data_counties";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
						
			$rand = rand(1, (int)$max);
			$params = array();
			$params["@prm_ID"] =  $rand;
			$county = "Mun. Bucuresti";
			$query = $this->sqlMapper->getQuery("COUNTIES", "select_CountyByID", $params);			
			
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			foreach($results as $result){
				$result = get_object_vars($result);
				$county = $result["COUNTY"];
			}			
			
			if($addressType == 1)
				$address = $streetType." ".$street." ".rand(1, 289).", ".$city." ".rand(1123412, 4872691)." ".$county;			
			elseif($addressType == 2)
				$address = $street." ".rand(1, 201).", BL. ".rand(1, 405).", "."SC. ".$alphabet[rand(1, 24)].", ".$city.", ".$county.", Romania";
			elseif($addressType == 3){
				$rand1 = rand(1, 335);
				$rand2 = rand($rand1 + 1, $rand1+2);
				$address = $streetType." ".$street." ".$rand1."-".$rand2.", ".rand(47566, 102366).", ".$city;
			}elseif($addressType == 4)
				$address = $street." ".rand(12357, 43679).", ".$city.", ".$county.", "."Romania";
			elseif($addressType == 5)
				$address = rand(1, 367)." ".$street." ".$streetType." ".rand(100234, 400316)." ".$city." ".$county." Romania";
				
			return $address;
		}
		
		function createName(){
			$firstName = "";
			$lastName = "";
			
			$params = array();
			$params["@prm_TABLE"] = "data_firstname";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			$rand = rand(1, $max);
			$params = array();
			$params["@prm_ID"] = $rand;
			$query = $this->sqlMapper->getQuery("FIRST_NAME", "select_FirstNameByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			foreach($results as $result){
				$result = get_object_vars($result);
				$firstName = $result["FIRST_NAME"];
			}
			
			$params = array();
			$params["@prm_TABLE"] = "data_firstname";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			
			$rand = rand(1, $max);
			$params = array();
			$params["@prm_ID"] = $rand;
			//$result = $this->db->select("LAST_NAME", "select_LastNameByID", $params);
			$query = $this->sqlMapper->getQuery("LAST_NAME", "select_LastNameByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			foreach($results as $result){
				$result = get_object_vars($result);
				$lastName = $result["LAST_NAME"];
			}
			
			$_SESSION["DATA_GENERATOR"]["FIRST_NAME"] = $firstName;
			$_SESSION["DATA_GENERATOR"]["LAST_NAME"] = $lastName;
			
			return $firstName." ".$lastName;
		}
		
		function createEmail(){
			$rand = rand(1, 8);
			$domain = str_replace(" ", "", $_SESSION["DATA_GENERATOR"]["OFFICIAL_NAME"]);
			$domain = str_replace("&", "", $domain);
			$domain = str_replace(".", "", $domain);
			$domain = str_replace("-", "", $domain);
			$domain = strtolower($domain);
			$firstName = strtolower($_SESSION["DATA_GENERATOR"]["FIRST_NAME"]);
			$lastName = strtolower($_SESSION["DATA_GENERATOR"]["LAST_NAME"]);
			
			$email = "";
			if($rand == 1)
				$email = $firstName.".".$lastName."@".$domain.".com";
			if($rand == 2)
				$email = $firstName.".".$lastName."@".$domain.".ro";
			if($rand == 3)
				$email = $firstName."_".$lastName."@".$domain.".com";				
			if($rand == 4)
				$email = $firstName."_".$lastName."@".$domain.".ro";	
			if($rand == 5)
				$email = $firstName."@".$domain.".com";
			if($rand == 6)
				$email = $firstName."@".$domain.".ro";
			if($rand == 7)
				$email = $firstName."_".$lastName."@"."yahoo.com";				
			if($rand == 8)
				$email = $firstName.".".$lastName."@"."gmail.com";	
				
			return $email;
		}
		
		function createURL(){
			$rand = rand(1, 4);
			$domain = str_replace(" ", "", $_SESSION["DATA_GENERATOR"]["OFFICIAL_NAME"]);
			$domain = str_replace("&", "", $domain);
			$domain = str_replace(".", "", $domain);
			$domain = str_replace("-", "", $domain);
			$domain = strtolower($domain);
			
			if($rand == 1)
				$web = "www.".$domain.".ro";			
			if($rand == 2)
				$web = "www.".$domain.".com";							
			if($rand == 3)
				$web = "www.".$domain.".net";			
			if($rand == 4)
				$web = "www.".$domain.".biz";			
			
			return $web;
		}
		
		function createContractTitle(){
			$params = array();
			$params["@prm_TABLE"] = "data_contracts";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			
			$rand = rand(1, $max);
			$params = array();
			$params["@prm_ID"] = $rand;
			//$result = $this->db->select("CONTRACTS", "select_ContractByID", $params);
			$query = $this->sqlMapper->getQuery("CONTRACTS", "select_ContractByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$contractName = "";
			$contractDescription = "";
			$additionalInformation = "";
			
			foreach($results as $result){
				$result = get_object_vars($result);
				$contractName = $result["NAME"];
				if($result["ADDITIONAL_INFO"]> 0)
					$additionalInformation = $result["DESCRIPTION"];
				else
					$contractDescription = $result["DESCRIPTION"];
			}
						
			$_SESSION["DATA_GENERATOR"]["CONTRACT_DESCRIPTION"] = $contractDescription;
			$_SESSION["DATA_GENERATOR"]["CONTRACT_ADDITIONAL_INFO"] = $additionalInformation;
			
			return $contractName;	
		}
		
		function createDeposit(){
			$params = array();
			$params["@prm_TABLE"] = "data_deposits";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			
			$rand = rand(1, $max);
			$params = array();
			$params["@prm_ID"] = $rand;
			//$result = $this->db->select("DEPOSITS", "select_DepositByID", $params);
			$query = $this->sqlMapper->getQuery("DEPOSITS", "select_DepositByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$deposit = "";
			
			foreach($results as $result){
				$result = get_object_vars($result);
				$deposit = $result["DEPOSIT"];
			}
			
			return $deposit;	
		}
		
		function createAward(){
			$params = array();
			$params["@prm_TABLE"] = "data_award";
			$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
			$this->db->setQuery($query);
			$result = get_object_vars($this->db->loadObject());
			$max = $result["ID"];
			
			$rand = rand(1, $max);
			$params = array();
			$params["@prm_ID"] = $rand;
			//$result = $this->db->select("AWARDS", "select_AwardByID", $params);
			$query = $this->sqlMapper->getQuery("AWARDS", "select_AwardByID", $params);
			$this->db->setQuery($query);
			$results = $this->db->loadObjectList();
			$award = "";
			
			foreach($results as $result){
				$result = get_object_vars($result);
				$award = $result["AWARD"];
			}
			
			return $award;	
		}
	}

?>