<?php
	defined('_JEXEC') or die;
	
	$jqueryPath = JPATH_SITE . DS . "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "require.jQuery.php";
	require_once($jqueryPath);

	$sqlMapperPath = JPATH_SITE . DS . "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);	
	
	
	$pack = new Pack();
	$xmlTable = $pack->getJOUEReady();	
	echo $xmlTable;
	
	
	class Pack{
		var $db;
		var $sqlMapper;
		
		function Pack(){
			$this->db = JFactory::getDBO();
			$this->sqlMapper = new SQLMapper();			
		}
		
		function getJOUEReady(){
			$params = array();
			$params["@prm_READY"] = 1;
			$query = $this->sqlMapper->getQuery("PACKSEND", "select_childHeader", $params);
			$this->db->setQuery($query);			
			$results = $this->db->loadObjectList();
			$xmlTable = "<table cellpadding='10' cellspacing='10'>
							<tr>
								<th>Numar</th>
								<th>Form</th>
								<th>User</th>
								<th>Prima Limba</th>
								<th>Are traducere</th>
							</tr>
						";
			foreach($results as $xml){
				$xml = get_object_vars($xml);
				$id = $xml["ID"];
				$form = $xml["FormName"];
				$user = $xml["Username"];
				$lang = $xml["Language"];
				$child = $xml["Child"];
				
				$tr = "	<tr>
							<td>$id</td>
							<td>$form</td>
							<td>$user</td>
							<td>$lang</td>
							<td>$child</td>
						</tr>";				
				$xmlTable.= $tr;		
			}
			$xmlTable.= "</table>";
			$xmlTable.= "<div id='buttonContainer'><button id='sendJOUE'>Trimite packetul</button></div>";
			
			if(!empty($results))			
				return $xmlTable;
			else
				return "Nu exista pachete!";
		}
		
		function sendToJOUE(){
			
		}
	}
	
?>

<script type='text/javascript'>
	$(document).ready(function(){
		$('#sendJOUE').click(function(){
			var pathname = window.location.pathname;			
			pathname = pathname.replace("administrator/index.php", "");	
			pathname = pathname + "/"  + "index.php?option=com_vtenderforms&ajaxAction=sendxml&sendPack=true";
			$("#buttonContainer").html("<p align='left'>Se trimite pachetul ... </p>");				
			$.ajax({
					method: "POST",
					//url: "index.php?option=com_vtenderforms&ajaxAction=sendxml",
					url: pathname,
					data:{sendPack: true},
					cache: false,
					success: function(data){			
						$("#buttonContainer").html("<button id='sendJOUE'>Trimite packetul</button>");
						alert('Pachetul a fost trimis!');
						window.location.reload()
					},
					error: function(data){
						alert(data);
					}
				});
		});
	});
</script>