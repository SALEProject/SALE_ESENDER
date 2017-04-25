<?php
	defined('_JEXEC') or die;
	
	class SQLMapper{
		var $platformSQLS = array();
		
		function SQLMapper(){								
			$sqlsPath = JPATH_SITE . DS . "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "sqls.php";
			include($sqlsPath);
			
			$this->platformSQLS = $platformSQLS;
		}
		
		function getQuery($sqlCategory, $sqlID, $sqlParams){	
			//some validations			
			if(($sqlCategory == "") || ($sqlID == "") && (!is_array($sqlParams)))
				throw new Exception('SQLMapper ERROR: Select parameters - please provide $sqlCategory, $sqlID and $sqlParams (array type)!');			
			try{
				$slqs = array();
				$sqls = $this->platformSQLS[$sqlCategory];
				
				$query = "";								
				
				foreach($sqls as $sql){
					if(strcmp(strtoupper($sql["ID"]), strtoupper($sqlID)) == 0)
						$query = $sql["SQL"];
				}
				
				if($query == ""){
					echo $sqlCategory;
					echo "<br/>";
					echo $sqlID;
					echo "<br/>";
					print_r($sqls);
					echo "<br/>";
				}	
				
				
				if($query == "")
					throw new Exception('SQLMapper ERROR: Query "'.$sqlID.'" was not founded in sqls array.');
				
				if(empty($sqlParams)){
					throw new Exception ('SQLParams ERROR: QueryID"'.$sqlID.'"');
				}	
				
				foreach($sqlParams as $param=>$value){
					$query = str_replace($param, $value, $query);
				}
				
				return $query;
				
			}catch (Exception $e){
				
				echo $e->getMessage();
			}
		}
	}
?>