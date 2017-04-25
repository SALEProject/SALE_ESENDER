<?php

// intoarce calea completa a site-ului curent, ca server si nume de WebApplication, in functie
// de cum a fost apelata pagina curenta
function GetWebsitePath()
{
	$host = $_SERVER["SERVER_NAME"];
	$port = $_SERVER["SERVER_PORT"];
	$docRoot = $_SERVER["REQUEST_URI"];
	$docRoot = str_replace("/","#",$docRoot);
	$docRoot = substr($docRoot,1,strpos($docRoot,"#",1)-1);

	$WebsitePath = "";
	if(strlen($port) > 0)
	{
		$WebsitePath = "http://".$host.":".$port."/".$docRoot;
	}	
	else
	{
		$WebsitePath = "http://".$host."/".$docRoot;	
	}

	return $WebsitePath;
}

?>