<?php
	$breadcrumb = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.BreadCrumb.php";	
	require_once($breadcrumb);	
	
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	$sqlMapper = new SQLMapper();
	
	$db = JFactory::getDbo();
	
	$form = $_GET["form"];
	$lang = $_GET["lang"];
	
	$params = array();
	$params["@prm_Code"] = "F".str_replace("form", "", $form);
	$params["@prm_Lang"] = $lang;	
	$query = $sqlMapper->getQuery("FORMS", "select_formname", $params);
	
	$db->setQuery($query);
	$result = get_object_vars($db->loadObject());
	$name = $result[$lang];
		
	$bc = new BreadCrumb($name, "index.php?option=com_vtenderforms&form=$form&Itemid=108&lang=$lang");
?>