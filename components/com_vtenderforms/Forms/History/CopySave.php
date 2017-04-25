<?php
	defined('_JEXEC') or die;

	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
		
	$db = JFactory::getDbo();
	$sqlMapper = new SQLMapper();
	
	$IDSave = intval(mysql_real_escape_string($_GET["IDSave"])); // anti SQL injection 				
	try
	{
		// initial
		$parh1 = array();
		$parh1["@prm_ID_Header"] = $IDSave; 
		
		$query = $sqlMapper->getQuery("SAVEDB", "copy_Save_Add", $parh1);
		$db->setQuery($query);
		$db->query();	

		$rs1 = $db->Select("SAVEDB", "copy_Save_LastID", $parh1);		
		$query = $sqlMapper->getQuery("SAVEDB", "copy_Save_LastID", $parh1);
		$db->setQuery($query);
		$result = $db->loadObjectList();

		$ID_LastID = 0;
		foreach($result as $row){
			$row = get_object_vars($row);
			$ID_LastID = $row["ID"];  
		}					
		
		$parh1["@prm_ID_New"] = $ID_LastID; 
		$query = $sqlMapper->getQuery("SAVEDB", "copy_Save_GetInfo", $parh1);
		$db->setQuery($query);
		$result = $db->loadObjectList();
		print_r($result);
		
		foreach($result as $row){
			$row = get_object_vars($row);
			$parh1["@prm_LanguageFrom"] = $row["LanguageFrom"];
			$parh1["@prm_LanguageTo"] = $row["LanguageTo"];
		}

		//while ($row = mysql_fetch_assoc($result)) {
		foreach($result as $row){
			print_r($result);
			$row = get_object_vars($row);
			//$Link .= $row["SitePath"] . '&ID=' . $row['ID'] . '&ID_Language=' . $row['ID_Language'];  
			$Link .= "index.php?option=com_vtenderforms&form=" .str_replace("F", "form", $row["Form_Name"]) . '&ID=' . $row['ID'] . '&lang=' . $row['LanguageTo'];  
			$parh1["@prm_LanguageFrom"] = $row["LanguageFrom"];
			$parh1["@prm_LanguageTo"] = $row["LanguageTo"];
		}		
		
		$query = $sqlMapper->getQuery("SAVEDB", "copy_Save_Details", $parh1);
		$db->setQuery($query);
		$db->query();	

		$query = $sqlMapper->getQuery("SAVEDB", "copy_Save_Update", $parh1);
		$db->setQuery($query);
		$db->query();				
		
		header('Location: ' . $Link);

		// echo $Link;
	} catch (Exception $e) {
		echo 'Exceptie in pagina: ', $e->getMessage(), "\n";
	}
?>