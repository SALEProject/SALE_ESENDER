<?php
	defined('_JEXEC') or die;

	require_once("components" . DS . "com_vtendergenerator" . DS . "Generator" . DS . "class.XMLGenerator.php");
	require_once("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "include" . DS . "class.ProcessForm.php");
	require_once("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "include" . DS . "class.SaveFormData.php");

	$form = new ProcessForm($_POST);
	$dataArray = $form->getFormArray();

	$generator = new XMLGenerator();
	/*if ($generator->generateXML($dataArray) == 0)
	{
		$save = new SaveFormToDB();
		$save->Save($dataArray);
	}*/
	$generator->generateXML($dataArray);
	$save = new SaveFormToDB();
	$save->Save($dataArray,$generator->GetXMLFile());
	?>
