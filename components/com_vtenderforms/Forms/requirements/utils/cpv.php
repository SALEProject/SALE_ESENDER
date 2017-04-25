<?php

	defined('_JEXEC') or die;
	//fullFormJsHeader. Contains: $, tabs, scriptForm, GetDataJS, custom form js if exists.
	$requirementsPath = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements";
	require_once($requirementsPath . DS . "require.jQuery.php");
	
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";	
	require_once($sqlMapperPath);
	$sqlMapper = new SQLMapper();
	
	$db = JFactory::getDbo();
	$isSearch = false;
	
	
	$params = array();
	$params["@prm_CPVType"] = strtoupper($_GET["utils"]);
	if(isset($_POST["offset"])){
		$offset = $_POST["offset"];
		$offset = mysql_real_escape_string($offset);		
		$params["@prm_Offset"] = $offset + 100;
	}else{
		$params["@prm_Offset"] = 100;	
	}
	
	$params["@prm_LIKE"] = '-1 = -1';
	
	
	if(isset($_GET["search"])){		
		$like = "";
		
		if(isset($_POST["code"])){
			$code = $_POST["code"];
			$code = mysql_real_escape_string($code);	
			if($code == "")
				$like = "";			
			else{
				$like = " lv.`CODE` LIKE '%$code%' ";							
				$isSearch = true;	
			}				
		}
		
		if(isset($_POST["ro"])){			
			$ro = $_POST["ro"];
			$ro = mysql_real_escape_string($ro);		
			if($ro!= ""){
				if($like == "")
					$like = " lv.`CONTENT_RO` LIKE '%$ro%' ";
				else
					$like.= " AND lv.`CONTENT_RO` LIKE '%$ro%' ";
				
				$isSearch = true;			
			}		
		}
		
		if(isset($_POST["en"])){
			$en = $_POST["en"];
			$en = mysql_real_escape_string($en);					
			if($en!= ""){
				if($like == "")
					$like = " lv.`CONTENT_EN` LIKE '%$en%' ";
				else
					$like.= " AND lv.`CONTENT_EN` LIKE '%$en%' ";
				
				$isSearch = true;	
			}					
		}
		
		if($like == "")
			$like = " -1 = -1 ";
			
		$params["@prm_LIKE"] = $like;
		
		if($isSearch)
			$params["@prm_Offset"] = 100000000000;	
	}
	

	$codeValue = -1;
	if(isset($_GET["codeValue"])){
		$codeValue = $_GET["codeValue"];
		$codeValue = mysql_real_escape_string($codeValue);			
	}

	
	$query = $sqlMapper->getQuery("LISTS", "select_cpv", $params);	
	/*echo $query;
	echo "<br/>";*/	
	$db->setQuery($query);
	$results = $db->loadObjectList();
	
	$table = "<div id='cpvTableContainer'><table id='cpvTable' class='table table-hover table-bordered'>";
	$table.= "<tr>
				<th>Select</th>
				<th width='33,3%'>Cod CPV<br/><input type='text' class='search' id='codeSearch'/><span class='icon-search codeSearch'></span></th>
				<th width='33,3%'>Nume RO<br/><input type='text' class='search' id='roSearch' /><span class='icon-search roSearch'></span</th>
				<th width='33,3%'>Nume EN<br/><input type='text' class='search' id='enSearch' /><span class='icon-search enSearch'></span</th>
			 </tr>";
	
	$nr = 0;
	
	foreach($results as $cpv){		
		$nr++;
		$cpv = get_object_vars($cpv);
		$cpvCode = $cpv["CODE"];
		$cpvEN = $cpv["CONTENT_EN"];
		$cpvRO = $cpv["CONTENT_RO"];
		$checked = ($cpvCode == $codeValue)?"checked":"";		
		$table.= "<tr>
					<td><input type='checkbox' class='cpv' name='cpv_$cpvCode' value='$cpvCode' $checked/></td>
					<td>$cpvCode</td>
					<td>$cpvRO</td>
					<td>$cpvEN</td>					
				  </tr>";
	}	
	
	//if(!$isSearch){
	$table.= "</table></div>";				
	if(!$isSearch)
		$table.= "<div id='more$nr' class='moreBox'><p class='info' align='center'><a class='more' href='#' id='$nr'>More</a></p></div>";	
	//}
	
	echo $table;

?>

<script type='text/javascript'>
	$(document).ready(function(){					
		var $_GET = <?php echo json_encode($_GET); ?>;	
		$(document).on('change', 'input.cpv', function(){					
		//$('.cpv').change(function(event){						
			var value = this.value;		
			$('.cpv').each(function(){
				var val = this.value;
				if(val!= value)			
					$(this).attr('checked', false);
			});			
			
			var n = $('.cpv:checked').length;
			
			if(n == 0)
				value = "";
				//window.parent.writepostback('');	
			codeValue = value;	
			codeName = "";
			window.parent.writepostback($_GET["field"], codeValue, codeName);						
		});
		
		$(document).on('click', 'a.more', function(){
			//$('.more').click(function(event){	
				event.preventDefault();
				var ID = $(this).attr('id');			
				var codeValue = ($_GET["codeValue"] > 0)?$_GET["codeValue"]:"-1";
				if(ID){
					$("#more" + ID).html("<p class='info' align='center'><img src='images/loader.gif' /></p>");									
					var urlCPV = "index.php?option=com_vtenderforms&ajaxAction=getCPV";
					var dataCPV = "offset" + ID;					
					$.ajax({
						method: "POST",
						url: "index.php?option=com_vtenderforms&ajaxAction=" + $_GET["utils"] + "&utils=" + $_GET["utils"] + "&format=raw&field=" + $_GET["field"] + "&codeValue=" + codeValue,
						data: {offset:ID}, 
						cache: false,
						success: function(html){
							$("#cpvTableContainer").html(html);
							$("#more" + ID).remove();							
						}
					});
				}else{
					$(".moreBox").html("<p class='warning' align='center'>THE END</p>");
				}
			//});
		});
		
		//$(document).on('click', 'span.icon-search', function(){			
		$(document).on('click', 'span.codeSearch,span.roSearch,span.enSearch', function(){	
			var code = $('#codeSearch').val();
			var ro = $('#roSearch').val();
			var en = $('#enSearch').val();		
			$("#more100").remove();
			$("#cpvTableContainer").html("<div height='100%' valign='center'><p class='info' align='center'><img src='images/loader.gif' /></p></div>");	
			$.ajax({
						method: "POST",
						url: "index.php?option=com_vtenderforms&search=true&ajaxAction=" + $_GET["utils"] + "&utils=" + $_GET["utils"] + "&format=raw&field=" + $_GET["field"],
						data: {code:code, ro:ro, en:en}, 
						cache: false,
						success: function(html){
							$("#cpvTableContainer").html(html);							
							$('#codeSearch').val(code);
							$('#roSearch').val(ro);
							$('#enSearch').val(en);
						}
			});
		});
	});
</script>