<?php
		require_once ("Mail.php"); 
		require_once("Mail/mime.php");

		$configPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "config.php";
		require_once($configPath);

		$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
		require_once($sqlMapperPath);		
		
		class PackSender{
			var $db;
			var $sqlMapper;
			var $xmlDir;
			var $sourceDirPath;
			var $newDirPath;
			var $files;
			var $esenderLogin;
			var $customerLogin;
			var $zipPath;
			var $zipName;
			var $ZXF;
			
			function PackSender(){
				
				global $vtender_config;												
				$this->xmlDir = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "PackSender" . DS . "xml";
				$this->sourceDirPath = $this->xmlDir. DIRECTORY_SEPARATOR ."xml";
				$this->newDirPath = "";
				$this->xmlName = "";
				$this->db = JFactory::getDbo();
				$this->sqlMapper = new sqlMapper();
				$this->esenderLogin = $vtender_config['esender_login'];
				//$this->customerLogin = $vtender_config['customer_login'];				
				$this->customerLogin = "";				
				$this->packAndSend();
			}								
			
			function packAndSend(){
				$this->createNewFolder();	//history folder				
				if(!$this->processFiles()){	//NO_DOC_EXT and correct file name
					echo "<script type='text/javascript'>alert('No files in xmlDir! Application can\'t send notices!');</script>";
					return;
				}

				if(!$this->createZIP()){
					echo "<script type='text/javascript'>alert('Zip file could not be created! Application can\'t send notices!');</script>";
					return;
				}
				
				$this->createMail();		//mail structure
				//$this->sendMail();		//send mail
				
				$this->updateJOUESent();
			}
			
			function createNewFolder(){
				$newNr = $this->getUniqueNumber("XML_FOLDER");	
				$id = $this->getUniqueItemID("XML_FOLDER");									
				$this->insertUniqueNumber($newNr, $id);			
				
				$this->newDirPath = $this->xmlDir. DIRECTORY_SEPARATOR .date("Y-m-d")."_".$newNr;
				mkdir($this->newDirPath);		
			}
			
			/*function processFiles(){
				$dir  = opendir($this->sourceDirPath);
				while (false !== ($filename = readdir($dir))) {
					if(($filename != '.') && ($filename != '..') && (strpos($filename, "xml")!==false)){
						$this->files[] = $filename;						
					}
				}					
							
				if(empty($this->files)){
					return false;
				}
				else{
					foreach($this->files as $file){
						$doc = new DOMDocument();
						$doc->load($this->sourceDirPath. DIRECTORY_SEPARATOR .$file);
						$searchedNode = "NO_DOC_EXT";
						$no_doc_ext = $doc->getElementsByTagName($searchedNode);
						$newNr = $this->getUniqueNumber($searchedNode);
						$id = $this->getUniqueItemID($searchedNode);
						$this->insertUniqueNumber($newNr, $id);										
						$nodocextValue = date("Y")."-".str_pad((int)$newNr, 6, "0", STR_PAD_LEFT);
						$no_doc_ext->item(0)->nodeValue = $nodocextValue;
						$xmlName = $this->esenderLogin.$this->customerLogin."-".$nodocextValue.".xml";												
						$doc->save($this->newDirPath. DIRECTORY_SEPARATOR .$xmlName);	
						$this->ZXF[] = array("ID_XML" => $id, "XML_PATH" => realpath($this->newDirPath. DIRECTORY_SEPARATOR .$xmlName));
					}	
					return true;
				}				
			}*/

			function processFiles(){
				$dir  = opendir($this->sourceDirPath);
				while (false !== ($filename = readdir($dir))) {
					if(($filename != '.') && ($filename != '..') && (strpos($filename, "xml")!==false)){
						$this->files[] = $filename;						
					}
				}					
							
				if(empty($this->files)){
					return false;
				}
				else{
					foreach($this->files as $file){
						$doc = new DOMDocument();
						$doc->load($this->sourceDirPath. DIRECTORY_SEPARATOR .$file);
						$searchedNode = "NOTICE_DISPATCH_DATE";
						$notice_dispatch_date = $doc->getElementsByTagName($searchedNode);						
						foreach($doc->getElementsByTagName($searchedNode) as $node){							
							$node->getElementsByTagName("DAY")->item(0)->nodeValue = Date("d");
							$node->getElementsByTagName("MONTH")->item(0)->nodeValue = Date("m");
							$node->getElementsByTagName("YEAR")->item(0)->nodeValue = Date("Y");
						}
						$searchedNode = "NO_DOC_EXT";
						$no_doc_ext = $doc->getElementsByTagName($searchedNode);
						$newNr = $this->getUniqueNumber($searchedNode);
						$id = $this->getUniqueItemID($searchedNode);
						$this->insertUniqueNumber($newNr, $id);
						$nodocextValue = date("Y")."-".str_pad((int)$newNr, 6, "0", STR_PAD_LEFT);
						$no_doc_ext->item(0)->nodeValue = $nodocextValue;
						$xmlName = $this->esenderLogin.$this->customerLogin."-".$nodocextValue.".xml";
						$doc->save($this->newDirPath. DIRECTORY_SEPARATOR .$xmlName);
						$this->ZXF[] = array("ID_XML" => $id, "XML_PATH" => realpath($this->newDirPath. DIRECTORY_SEPARATOR .$xmlName));
						$this->updateJOUE_NODOCEXT($file, $nodocextValue);
					}	
					return true;
				}				
			}
			
			function createZIP(){				
				$zip = new ZipArchive();				
				$newNr = $this->getUniqueNumber("ZIP");
				$id = $this->getUniqueItemID("ZIP");
				$this->insertUniqueNumber($newNr, $id);
				$params = array();
				$params["@prm_TABLE"] = "UNICITY";
				$query = $this->sqlMapper->getQuery("GENERAL", "sql_LastTableID", $params);
				$this->db->setQuery($query);
				$result = get_object_vars($this->db->loadObject());
				$zipDBID = $result["ID"];
				$this->zipName = $this->esenderLogin.$this->customerLogin."-XML".str_pad((int)$newNr, 2, "0", STR_PAD_LEFT)."-".date("Ymd");
				$this->zipPath = 	$this->newDirPath. DIRECTORY_SEPARATOR .$this->zipName.'.zip';
				for($i = 0; $i < count($this->ZXF); $i++){
					$params = array();
					$params["@prm_ID_ZIP"] = $zipDBID;
					$params["@prm_ID_XML"] = $this->ZXF[$i]["ID_XML"];
					$params["@prm_ZIP_PATH"] = $this->zipPath;
					$params["@prm_XML_PATH"] = $this->ZXF[$i]["XML_PATH"];
					$params["@prm_DATETIME"] = date("Y-m-d H:m:s");
					$query = $this->sqlMapper->getQuery("ZXF", "insert_ZXF", $params);
					$this->db->setQuery($query);
					$this->db->query();
				}
				
				$res = $zip->open($this->zipPath, ZIPARCHIVE::CREATE);
				if ($res === TRUE) {
					$dir  = opendir($this->newDirPath);
					while (false !== ($filename = readdir($dir))) {
						if(($filename != '.') && ($filename != '..') && (strpos($filename, "xml")!==false)){
							$zip->addFile($this->newDirPath. DIRECTORY_SEPARATOR .$filename, $filename);	
						}						
					}						
					$zip->close();
					echo 'Zip Created';
					return true;					
				} else {
					echo 'Zip Failed';
					return false;
				}
			}	
			
			function createMail(){		
				global $vtender_config;
				//-------------------configure smtp-------------------------------//
				$host = $vtender_config["smtp"]["host"];
				$username = $vtender_config["smtp"]["username"];
				$password = $vtender_config["smtp"]["password"];
				$port = $vtender_config["smtp"]["port"];
				$smtp = @Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => 'PLAIN', 'username' => $username, 'password' => $password));
				//----------------------------------------------------------------//
				
				//-------------------email details--------------------------------//
				$from = $vtender_config["smtp"]["from"];
				//$to = "alex@4esoft.ro";
				//$to = $vtender_config["smtp"]["to"];
				//$to = 'ojs-esenders@publications.europa.eu';
				//$bcc = 'alex@4esoft.ro, alexandru.traistaru@4esoft.ro, razvanb@4esoft.ro';				
				//$bcc = '';
				//$replyTo = "ojs@4esoft.ro";
				//$to = $vtender_config["smtp"]["to"];
				$to = "alex@4esoft.ro";
				$bcc = "";
				//$bcc = $vtender_config["smtp"]["bcc"];
				$replyTo = $vtender_config["smtp"]["replyto"];
				$subject = $this->zipName;				
				$body = "";
				$crlf = "\n";
				
				$html = "";				
				$dir  = opendir($this->newDirPath);
					while (false !== ($filename = readdir($dir))) {
						if(($filename != '.') && ($filename != '..') && (strpos($filename, ".xml")!==false)){
							$html.= str_replace(".xml", "", $filename);
							$html.= "<br/>";
					}						
				}	
				$file = $this->zipPath;
				//----------------------------------------------------------------//
				
				//-------------------configure email------------------------------//
				$headers = array ('From' => $from,
				    			  'To' => $to,								  
								  'Reply-To' => $replyTo,
								  'Subject' => $subject);
								  
				@$mime = new Mail_Mime($crlf);
				@$mime->setTXTBody($body);
				@$mime->setHTMLBody($html);
				@$mime->addAttachment($file, 'application/octet-stream');				  
				
				@$body = $mime->get();
				@$headers = $mime->headers($headers);
				//----------------------------------------------------------------//				  
				
				//------------------send email------------------------------------//
				
				$mail = @$smtp->send($to.', '.$bcc, $headers, $body);				
				//------------------ errors---------------------------------------//
				if (@PEAR::isError($mail)) {
				   echo("<p>" . $mail->getMessage() . "</p>");
  			    } else {
				   echo("<p>Message successfully sent!</p>");
				}
				//----------------------------------------------------------------//							
			}
			
			function updateJOUE_NODOCEXT($file, $nodocextValue){
				$parts = explode("_", $file);
				$id = $parts[1];
				
				$params = array();
				$params["@prm_ID"] = $id;
				$params["@prm_NO_DOC_EXT_VALUE"] = $nodocextValue;
				$query = $this->sqlMapper->getQuery("PACKSEND", "update_JOUENODOCEXT", $params);
				$this->db->setQuery($query);
				$this->db->query();
			}
			
			function updateJOUESent(){
				foreach($this->files as $xmlName){
					$parts = explode("_", $xmlName);
					$id = str_replace(".xml", "", $parts[1]);
					$params = array();
					$params["@prm_ID"] = $id;
					$query = $this->sqlMapper->getQuery("PACKSEND", "update_JOUESent", $params);	
					$this->db->setQuery($query);
					$this->db->query();
				}
			}
		
			function getUniqueNumber($uniqueItem){				
				$newNr = 0;
				$params = array();
				$params["@prm_UNIQUE_ITEM"] = $uniqueItem;
				$params["@prm_DATE"] = (strcmp($uniqueItem, "NO_DOC_EXT") == 0)?-1:date("Y-m-d");
				
				$query = $this->sqlMapper->getQuery("UNICITY", "select_UniqueNumber", $params);				
				$this->db->setQuery($query);
				
				if(!is_null($this->db->loadObject())){					
					$result = get_object_vars($this->db->loadObject());
					$newNr = $result['VALUE'];					
					$newNr++;					
				}else
					//$newNr = ($newNr > 0)?$newNr+1:1;
					$newNr = 1;				
				
				return $newNr;
			}
			
			function getUniqueItemID($uniqueItem){
				$id = 0;
				$params = array();
				$params["@prm_UNIQUE_ITEM"] = $uniqueItem;
				$query = $this->sqlMapper->getQuery("UNIQUE_ITEMS", "select_ItemIDByName", $params);
				$this->db->setQuery($query);
				$result = get_object_vars($this->db->loadObject());
				$id = $result['ID'];					
				
				return $id;
			}
			
			function insertUniqueNumber($value, $idUniqueItem){
				$params = array();
				$params["@prm_VALUE"] = $value;
				$params["@prm_ID"] = $idUniqueItem;
				$query = $this->sqlMapper->getQuery("UNICITY", "insert_UniqueNumber", $params);
				$this->db->setQuery($query);
				$this->db->query();
			}
	}