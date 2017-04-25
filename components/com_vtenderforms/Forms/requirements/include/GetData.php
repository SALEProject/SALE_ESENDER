<?php
	defined('_JEXEC') or die;
	echo "sdfsdf"	;
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
		
	$db = JFactory::getDbo();
	$sqlMapper = new SQLMapper();
	/*$query = "SELECT * FROM `languages` WHERE CODE = '$lang'";
	$db->setQuery($query);
	$result = get_object_vars($db->loadObject());
	$langID = $result["ID"];*/
	
	//$IDSave = intval(mysql_real_escape_string($_POST["ID"])); // anti SQL injection 
	//echo json_encode(array("x"=>"y"));		
	$IDSave = intval(($_POST["ID"]));
	echo json_encode(array("x"=>"y"));
		
	try
	{
		if (!is_int($IDSave)){
			print '{"ID_Ctl":"","Val_Ctl":"","Excel_Ctl_ID":""}';
		} else {
			//echo $IDSave;
			//echo json_encode(array("x"=>"$IDSave"));		
			$parh1 = array();
			$parh1["@prm_ID_Header"] = $IDSave; 
			
			$query = $sqlMapper->getQuery("SAVEDB", "select_Save", $parh1);
			$db->setQuery($query);
			$result = $db->loadObjectList();
					
			// $formattedData = json_encode($rs);
			// print $formattedData;
			
			foreach($result as $row){
				$row = get_object_vars($row);
				$json = array();
				$json['ID_Ctl'] = $row['ID_Ctl'];

				// echo "&#72;&#69;&#76;&#76;&#79;"

				$json['Val_Ctl'] = mb_convert_encoding($row['Val_Ctl'], 
						'UTF-8', 'HTML-ENTITIES');
				$json['Excel_Ctl_ID'] = $row['Excel_Ctl_ID'];
				$json['IDCtlOriginal'] = $row['IDCtlOriginal'];
				$data[] = $json;
			}
			
			/*while ($row = mysql_fetch_assoc($rs)) {
				$json = array();
				$json['ID_Ctl'] = $row['ID_Ctl'];

				// echo "&#72;&#69;&#76;&#76;&#79;"

				$json['Val_Ctl'] = mb_convert_encoding($row['Val_Ctl'], 
						'UTF-8', 'HTML-ENTITIES');
				$json['Excel_Ctl_ID'] = $row['Excel_Ctl_ID'];
				$json['IDCtlOriginal'] = $row['IDCtlOriginal'];
				$data[] = $json;
			}*/
			
			// add ID
			$json = array();
			$json['IDForm'] = $IDSave;
			$data[] = $json;
			
			// print_r($data);
			// header("Content-type: application/json");
			
			echo json_encode($data);		
		}
	} catch (Exception $e) {
		echo 'Exceptie in pagina: ', $e->getMessage(), "\n";
	}
?>