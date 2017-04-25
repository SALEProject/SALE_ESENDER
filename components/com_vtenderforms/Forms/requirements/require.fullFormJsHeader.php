<?php
	defined('_JEXEC') or die;
	
	$document = JFactory::getDocument();
	//jquery
	$document->addScript("http://code.jquery.com/jquery-1.9.1.js");
	$document->addScript("http://code.jquery.com/ui/1.10.2/jquery-ui.js");		
	$document->addStyleSheet("http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css");	
	
	$requirementsPath = "components" . "/" . "com_vtenderforms" . "/" . "Forms" . "/" . "requirements";
	//tabs.js
	$document->addScript($requirementsPath . "/" . "tabs.js");
	//scriptForm.js
	$document->addScript($requirementsPath . "/" . "include" . "/" . "scriptForm.js");
	//validator.js
	$document->addScript($requirementsPath . "/" . "include" . "/" . "validator.js");
	//time
	$document->addScript($requirementsPath . "/" . "include" . "/" . "jquery-ui-timepicker-addon.js");
	//GetDataJS.js
	$document->addScript($requirementsPath . "/" . "include" . "/" . "GetDataJS.js");
	//custom js for current form IF EXISTS!
	$formNr = str_replace("form", "", $_REQUEST["form"]);
	/*if(file_exists("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form$formNr" . DS . "form$formNr.js"))
		$document->addScript("components" . "/" . "com_vtenderforms" . "/" . "Forms" . "/" . "Form$formNr" . "/" . "form$formNr.js");
		
	if(file_exists("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form$formNr" . DS . "formTester.js"))
		$document->addScript("components" . "/" . "com_vtenderforms" . "/" . "Forms" . "/" . "Form$formNr" . "/" . "formTester.js");*/
		
	/*if($formNr == 3){
		//echo "saaaalut";
		$document->addScript("components" . "/" . "com_vtenderforms" . "/" . "Forms" . "/" . "Form$formNr" . "/" . "formFiller.js");
	}*/
?>