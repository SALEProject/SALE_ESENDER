<?php
	defined('_JEXEC') or die;

	$jqueryPath = "components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "require.jQuery.php";
	require_once($jqueryPath);

	require_once("components" . DS . "com_vtenderforms" . DS . "Forms" . DS . "requirements" . DS . "include" . DS . "Utils.php");
	$sqlMapperPath = "components" . DS . "com_vtenderutils" . DS . "Data" . DS . "class.SQLMapper.php";
	require_once($sqlMapperPath);

	// initial
	$sqlMapper = new SQLMapper();
	$db = JFactory::getDbo();
	try {
		echo '<form name="input" action="index.php?option=com_vtenderforms&action=mylist&Itemid=120" method="post">';

			$dateFrom = new DateTime();
			$dateFrom = $dateFrom->sub(new DateInterval('P7D'));
			$dateTo = new DateTime();
			$dateTo = $dateTo->add(new DateInterval('P1D'));

			$NumarIntern = '';
			$NumarJoue = '';

			$ID_Form = -1;
			if (!empty($_POST["cbForm"])){
				$ID_Form = $_POST["cbForm"];
			}

			if (!empty($_POST["datepickerFrom"])){
				$dateFrom = DateTime::createFromFormat('m/d/Y', $_POST["datepickerFrom"]);
			}

			if (!empty($_POST["datepickerTo"])){
				$dateTo = DateTime::createFromFormat('m/d/Y', $_POST["datepickerTo"]);
			}

			if (!empty($_POST["NumarIntern"])){
				$NumarIntern = $_POST["NumarIntern"];
			}

			if (!empty($_POST["NumarJoue"])){
				$NumarJoue = $_POST["NumarJoue"];
			}

			echo '<strong>Numar intern</strong>&nbsp;<input type="text" id="tbNumarIntern" name="NumarIntern" value="' . $NumarIntern . '"/>&nbsp;';
			echo '<strong>Numar JOUE</strong>&nbsp;<input type="text" id="tbNumarJoue" name="NumarJoue" value="' . $NumarJoue . '"/>&nbsp;';
			echo '<br />';

			// get data
			echo '<strong>Formular salvat:</strong>';
			$prm1 = array();
			$prm1["@prm_ID_User"] = 1;

			$query = $sqlMapper->getQuery("SAVEDB", "GetFormsList", $prm1);
			$db->setQuery($query);
			$result = $db->loadObjectList();
			echo '<select id="cb_Forms" name="cbForm">';
			foreach($result as $row){
				$row = get_object_vars($row);
				if ($row["ID"] == $ID_Form ) {
					echo '<option value="' . $row["ID"] . '" selected>' .$row["Name"] . '</option>';
				} else {
					echo '<option value="' . $row["ID"] . '">' .$row["Name"] . '</option>';
				}
			}
			echo '</select>';
			echo '<br />';

			echo '<strong>De la</strong>&nbsp;<input type="text" id="datepickerFrom" name="datepickerFrom" value="' . $dateFrom->format('m/d/Y') . '"/>&nbsp;';
			echo '<strong>Pana la</strong>&nbsp;<input type="text" id="datepickerTo" name="datepickerTo" value="' . $dateTo->format('m/d/Y') . '"/>&nbsp;';

			echo '&nbsp;&nbsp;<input type="submit" value="Cautare">';
			echo '<br /><br />';
			echo '</form>';

			$user = JFactory::getUser();
			// lista de salvari

			$userID = $user->get('isRoot') == 1?-1:$user->id;
			$parh = array();
			$parh["@prm_ID_User"] = $userID;
			$parh["@prm_ID_Form"] = $ID_Form;
			$parh["@prm_DateFrom"] = $dateFrom->format('Y-m-d');
			$parh["@prm_DateTo"] = $dateTo->format('Y-m-d');
			$parh["@prm_NumarIntern"] = $NumarIntern;
			$parh["@prm_NumarJoue"] = $NumarJoue;
			$parh["@prm_XML_Path"] = $XML_Path;

			$query = $sqlMapper->getQuery("SAVEDB", "select_HistorySaves", $parh);
			$db->setQuery($query);
			$result = $db->loadObjectList();

			$out = '<table class="table table-hover table-bordered" id="tblHistory" cellpadding="5" cellspacing="0" border="1">';
			$out .= "<tr>";
			$out .= "<th>Numar intern</th>";
			$out .= "<th>Numar JOUE</th>";
			$out .= "<th>Formular</th>";
			$out .= "<th>Nume oficial</th>";
			$out .= "<th>Data salvarii</th>";
			$out .= "<th>Limba oficiala</th>";
			$out .= "<th>Vizualizare XML</th>";     // NEW
			$out .= "<th>Trimite catre JOUE</th>";
			$out .= "</tr>";

			foreach($result as $row){
				$row = get_object_vars($row);
				$out .= "<tr>";
				$out .= '<td>'.$row["ID"].'</td>';
				$out .= '<td>'.$row["JOUE_NO_DOC_EXT"].'</td>';
				$out .= '<td>'.$row["Name"].'</td>';
				$out .= '<td>' . $row["RO"].'</td>';
				$out .= '<td>' . $row["Form_Date"] . '</td>';
				$out .= '<td><a href="index.php?option=com_vtenderforms&form=form' . str_replace("F", "", $row["Name"]) . '&lang=' . $row["Language"] . '&ID=' . $row["ID"] . '">' . $row["Language"] . '</a>&nbsp;';


				if ($row["ID_Header1"] == '')
					$out .=	'<a href="index.php?option=com_vtenderforms&action=copysave&IDSave='.$row["ID"] . '">+</a></td>';
				else
					$out .=	'<a href="index.php?option=com_vtenderforms&form=form'. str_replace("F", "", $row["Name"]) .'&ID=' . $row["ID_Header1"] . '&lang=' . $row["Language1"] .'">' . $row["Language1"] . '</a></td>';
					$out .= '<td><a href="'.$row["XML_Path"].'">' . 'Link</a> </td>';  // NEW

				$joueSent = $row["JOUEReady"];
				$saveID = $row["ID"];
				if($joueSent == 0)
					$button = "<div id='btnContainer_$saveID'><button id='sendJOUE' class='btn btn-success icon-envelope sendJOUE' name='sendJOUE_$saveID'>&nbsp;&nbsp;Trimite</button></div>";
				elseif($joueSent == 1)
					$button = "<div id='btnContainer'><button id='sent' class='btn btn-info icon-ok' disabled>&nbsp;&nbsp;Trimis</button></div>";
				$out.= "<td>$button</td>";
				$out .= "</tr>";
			}

			$out .= "</table>";
			echo $out;

		// echo '</form>';
	} catch (Exception $e) {
		echo 'Exceptie in baza de date: ', $e->getMessage(), "\n";
	}
?>

<script type='text/javascript'>
	$(document).ready(function(){
		//$(".sendJOUE").each(function(){
			//$("#sendJOUE").click(function(){
			$(".sendJOUE").click(function(){
				var name = $(this).attr("name");
				var id = $(this).attr("id");
				var saveID = name.replace("sendJOUE_", "");
				$("#btnContainer_" + saveID).html("<p align='center'><img src='images/loader.gif' /></p>");
				$.ajax({
					method: "POST",
					url: "index.php?option=com_vtenderforms&ajaxAction=sendxml",
					data:{saveID: saveID},
					cache: false,
					success: function(data){
						$("#btnContainer_" + saveID).html("<button id='sent' class='btn btn-info icon-ok' disabled>&nbsp;&nbsp;Trimis</button>");
					}
				});
			});
		//});
	});

	$(function() {
		$("#datepickerFrom").datepicker();
		$("#datepickerTo").datepicker();
	});
</script>
