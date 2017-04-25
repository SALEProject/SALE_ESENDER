<?php
	defined('_JEXEC') or die;
	
	//fullFormJsHeader. Contains: $, tabs, scriptForm, GetDataJS, custom form js if exists.
	$requirementsPath = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements";
	require_once($requirementsPath . DS . "require.fullFormJsHeader.php");
		
	//include form generator
	$formGeneratorPath = "components" . DS . "com_vtendergenerator" . DS . "Generator" . DS . "class.FormGenerator.php";
	require_once($formGeneratorPath);	
	
	$lang = "EN";
	if(isset($_GET['lang']) && ($_GET['lang']!= ""))
		$lang = $_GET['lang'];	
	
	$formGenerator = new FormGenerator("F8", $lang);
	$xml = $formGenerator->createForm();
	
	$form = file_get_contents("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "Form8" . DS . "form" . $lang . ".html");
	$idSave = isset($_GET['ID'])?$_GET['ID']:-1;
	
	echo "<form target='_blank' action='index.php?option=com_vtenderforms&form=form8&action=xml' method='POST' id='frm'>
			<input type='hidden' name='nameForm' value='F8' />
			<input type='hidden' name='langForm' value='$lang' />
			<input type='hidden' name='IdSave' value='$idSave' />
			<table width='100%'>
				<tr>
					<td>$form</td>
				</tr>
			</table>
			<br/>
			<table width='100%'>
				<tr>
					<td align='center'>
						<button type='submit' id='submit' class='btn btn-success icon-ok' name='submit'/>Save</button>
						<button type='button' id='cancel' class='btn btn-warning icon-remove' name='cancel'/>Cancel</button>
					</td>
				</tr>
			</table>
		  </form>";
?>