<?php
	defined('_JEXEC') or die;
	
	if($_SERVER['REQUEST_METHOD'] === 'GET'){		
		if(isset($_GET['form'])){
			$formNr = str_replace("form", "", $_GET["form"]);
			require_once("Forms" . DS . "requirements" . DS . "require.breadcrumb.php");
			require_once("Forms" . DS . "Form$formNr" . DS . "form$formNr.php");			
		}
		if(isset($_GET['action'])){
			switch($_GET['action']){
				case "mylist": 		require_once("Forms" . DS . "History" . DS . "HistoryList.php");
									break;
				case "listforms":	require_once("Forms" . DS . "listforms.php");
									break;
				case "copysave":	require_once("Forms" . DS . "History" . DS . "CopySave.php");
									break;
			}
		}		
		if(isset($_GET['utils'])){
			switch($_GET['utils']){
				case "cpv_main": 			require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;				
				case "cpv_supplimentary": 	require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;									
				case "nuts": 				require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;							
			}
		}
		
		if(isset($_GET['ajaxAction'])){
			switch($_GET['ajaxAction']){	
				case "GetData": 			require_once("Forms" . DS . "requirements" . DS . "Include" . DS . "GetData.php");
											break;							
				case "cpv_main": 			require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;				
				case "cpv_supplimentary": 	require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;	
				case "sendxml": 		    require_once("Forms" . DS . "PackSender" . DS . "index.php");
											break;	
			}
		}
	}else{
		if(isset($_REQUEST['form']) && ($_REQUEST['action'] === 'xml')){
			$formNr = str_replace("form", "", $_GET["form"]);
			require_once("Forms" . DS . "Form$formNr" . DS . "process.php");								
		}
		
		if(isset($_GET['action'])){
			switch($_GET['action']){
				case "mylist": 		require_once("Forms" . DS . "History" . DS . "HistoryList.php");
									break;				
			}
		}		
		
		if(isset($_GET['ajaxAction'])){
			switch($_GET['ajaxAction']){
				case "GetData": 			require_once("Forms" . DS . "requirements" . DS . "Include" . DS . "GetData.php");
											break;							
				case "cpv_main": 			require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;				
				case "cpv_supplimentary": 	require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;	
				case "nuts": 				require_once("Forms" . DS . "requirements" . DS . "utils" . DS . "cpv.php");
											break;	
				case "sendxml": 		    require_once("Forms" . DS . "PackSender" . DS . "index.php");
											break;	
			}
		}
	}	
?>