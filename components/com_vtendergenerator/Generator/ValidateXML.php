<?php

function libxml_display_error($error)
{
    $return = "<br />\n";
    switch ($error->level) {
        case LIBXML_ERR_WARNING:
            $return .= "<b>Warning $error->code: </b>";
            break;
        case LIBXML_ERR_ERROR:
            $return .= "<b>Error $error->code: </b>";
            break;
        case LIBXML_ERR_FATAL:
            $return .= "<b>Fatal Error $error->code: </b>";
            break;
    }
    $return .= '<span style="color: blue">' . trim($error->message) . '</span>';
    if ($error->file) {
        $return .=    " in $error->file<br />";
    }
    $return .= " on line $error->line\n<br />";

    echo $return;
}

function libxml_display_errors() {
    $errors = libxml_get_errors();
    foreach ($errors as $error) {
        echo libxml_display_error($error);
    }
    libxml_clear_errors();
}


function ValidateXMLFileWithShowErrors($NameOfXMLFile) {
	// Enable user error handling
	libxml_use_internal_errors(true);

	$xml1 = new DOMDocument(); 
	$xml1->load($NameOfXMLFile); 
		
	
	if (!$xml1->schemaValidate("components" . DS . "com_vtenderutils" . DS . "xsd" . DS . "xsduri" . DS . "TED_ESENDERS.xsd")) {
		echo '<br />';
		echo '<br />';
		//echo '<h2>DOMDocument::schemaValidate() Generated Errors!</h2><br />';		
		echo "<p class='success'>Documentul xml in format acceptat de JOUE a fost generat cu succes!</p>";
	
		echo '<p class="info">Puteti downloada documentul de la link-ul urmator: <a href="' .  $NameOfXMLFile . '" target="_blank">Documentul XML generat</a></p><br />';
		echo '<br />';
		echo '<br />';

		//libxml_display_errors();
		
		return 1; //if you want to activate
		//return 0; //if you want to deactivate
	}
	
	return 0;
}
?>