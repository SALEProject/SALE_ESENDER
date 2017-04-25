<?php		
	defined('_JEXEC') or die;

	$jqueryPath = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "require.jQuery.php";
	require_once($jqueryPath);
		
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	
	//$prepareXML = "components" . DS . "com_vtenderforms" . DS . "PackSender" . DS . "class.prepareXML.php";	
	$prepareXML = "class.prepareXML.php";	
	require_once($prepareXML);
	
	$saveID = "";
	if(isset($_POST["saveID"]))	
		$saveID = $_POST["saveID"];
		
	$saveID = mysql_real_escape_string($saveID);	
	
	
	if(!is_null($saveID) && (!empty($saveID))){			
		//1. first step is to prepare the xml
		$prepXML = new PrepareXML($saveID);
				
		//2. second step is to launch the package
		$date = date("dmY");
		$time = date("H:i");
		$hour = date("H");
		$minute = date("i");		
	}
	
	echo json_encode("123");
	return;
	
	$sendPack = "";
	if(isset($_POST["sendPack"]))	
		$sendPack = $_POST["sendPack"];
		
	$sendPack = mysql_real_escape_string($sendPack);	
		
	if(!is_null($sendPack) && (!empty($sendPack) && ($sendPack == true))){			
		$destination = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "PackSender" . DS . "xml" . DS . "xml";
		require_once("class.PackSender.php");
		$pack = new PackSender();		
		
		$dir = opendir($destination);
		while (false !== ($filename = readdir($dir))) {
			if(($filename != '.') && ($filename != '..') && (strpos($filename, "xml")!==false)){
				unlink($destination. DIRECTORY_SEPARATOR .$filename);
			}
		}
		
	}	
?>