<?php
$GLOBALS['vtender_config'] = array(
'dbconfig' => 
  array (
    'db_host_name' => 'localhost',
    'db_user_name' => 'root',
    'db_password' => '',
    'db_name' => 'vtender_ra',
  ),
  'category' => 'ORIGINAL', 
 'version' => 'R2.0.8.S02',
 'joue_class' => 'B',
 'esender_login' => 'TEDA8',
 'functional_email' => 'brm_ojs@brm.ro',
 'technical_email' => 'v.gheorghe@brm.ro',
 'content_email' => 'a.ursache@brm.ro',
 'nodoc' => '2012-123456',
 'smtp' => array(
	'host' => 'ssl://smtp.gmail.com',
	'username' => 'brm_ojs@brm.ro',
	'port' => '465',
	'password' => 'bojs2012',
	'replyto' => 'brm_ojs@brm.ro',
	'from' => 'brm_ojs@brm.ro',	
	'to' => 'ojs@publications.europa.eu',
	'bcc' => 'alex@4esoft.ro, alexandru.traistaru@4esoft.ro, razvanb@4esoft.ro',
	/*'host' => 'mail.4esoft.ro',
	'username' => 'alex@4esoft.ro',
	'port' => '25',
	'password' => 'Cocacola.08!4e',
	'replyto' => 'alex@4esoft.ro',
	'from' => 'alex@4esoft.ro',	
	'to' => 'alex@4esoft.ro',
	'bcc' => '',*/
 )
);
?>