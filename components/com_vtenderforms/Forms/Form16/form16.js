$(document).ready(function(){
		$("#submit").click(function(e){			
			if(verifyRequiredFields()){
				$(".DATE").val('');
				$(".DATE").clear();
				return true;
			}	
			else{
				displayErrorHints();
				return false;
			}				
		});								
		
		$(document).tooltip();
		//--------------form initialization-----------------------------
		//$("#tabs").tabs("option", "disabled", [5, 6]);
		$("#tabs").tabs("option", "disabled", [4, 5]);
		//---------------------section I-----------------------
		
		//insert radio button on section I---------------------
		var cace1 = "";
		var cace2 = "";
		if(formLang == "EN"){
			cace1 = "Contracting Authority";
			cace2 = "Contracting Entity";
		}	
		else{
			cace1 = "Autoritate Contractanta";
			cace2 = "Entitate Contractanta";
		}	
		var html = "<div class='radio' align='center'><input type='radio' name='cace' id='cace1' value='ca' ><label for='cace1'>"+cace1+"</label>";
		html+= "<input type='radio' name='cace' id='cace2' value='ca' ><label for='cace2'>"+cace2+"</label></div>";
				
		html = "<div class='radio' align='center'><input type='radio' id='radio1' name='radio' /><label for='radio1'>"+cace1+"</label><input type='radio' id='radio2' name='radio' /><label for='radio2'>"+cace2+"</label></div>";			
		$("#I\\.1").before(html);
		$("input[name='radio']").change(function(){			
			var id = $(this).attr("id");
			if(id == "radio2"){				
				$("#I\\.2").hide();
				$("#I\\.3\\.1").hide();
				$("#I\\.3\\.2").hide();
				$("#I\\.3\\.3").show();	
				removeClassInDiv("I\\.2", "required");
				removeClassInDiv("I\\.2", "error");
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.1", "error");
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.2", "error");
			}else{				
				$("#I\\.2").show();
				$("#I\\.3\\.1").show();	
				$("#I\\.3\\.3").hide();				
				$("#I\\.3\\.4").hide();				
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.3", "error");
				removeClassInDiv("I\\.3\\.4", "required");
				removeClassInDiv("I\\.3\\.4", "error");
			}
		});
				
		$("#radio1").attr("checked", true);		
		$("#radio1").change();
		$( ".radio" ).buttonset();	
		
		var selectors = {
			"FIRST":	{idSelect: "I1115", option: "value=A.1", idTargetDiv: "A.1"},
			"SECOND":	{idSelect: "VI31", option: "text=xyz", idTargetDiv: "A.2"},
			"THIRD":	{idSelect: "VI32", option: "text=xyz", idTargetDiv: "A.3"},
			"FOURTH":	{idSelect: "VI33", option: "text=xyz", idTargetDiv: "A.4"},
			"FIFTH":	{idSelect: "I71", option: "id=F16#I72#PURCHASING_ON_BEHALF_YES", idTargetDiv: "A.5"},
		};
		showTabMultiSelectors(selectors, 4);	
		
		//--------------------------------------------------------------------------
		
		//---------------------------section II-------------------------------------
		//II.4) Descrierea succinta a naturii si limitelor lucrarilor sau a naturii si cantitatii sau valorii bunurilor sau serviciilor
		var divs = {			
			"FIRST": {id: "II.4.2", master: "", required: "", requiredif: "II211?II212****II212?II211****II215?II216&&II217****II216?II215&&II217****II217?II216&&II215", unblock: "", block: "II211?II215&&II216&&II217****II212?II215&&II216&&II217****II215?II211&&II212****II216?II211&&II212****II217?II211&&II212"}
		};
		
		var idBefore = "";
		
		radioDivs(idBefore, divs); 	
		
		selectors = {
			"FIRST":	{idSelect: "II218", option: "id=F16#II2181#F16_DIV_INTO_LOT_YES", idTargetDiv: "B"},			
		};
		showTabMultiSelectors(selectors, 5);
		
		//II.6) Data prevazuta pentru începerea procedurilor de atribuire si durata contractului
		divs = {			
			"FIRST": {id: "II.6", master: "", required: "", requiredif: "II64?II65****II65?II64", unblock: "", block: "II62?II63&&II64&&II65****II63?II62&&II64&&II65****II64?II62&&II63****II65?II62&&II63"}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 	
		
		//VI.1) Informatii privind subcontractarea
		divs = {
			"FIRST": {id: "VI.1", master: "VI11", required: "", requiredif: "VI11?VI12", unblock: "VI11?VI12", block: ""}
		};	
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		disableFieldsInDiv("VI\\.1", "VI11");	

		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.1", master: "A11", required: "", requiredif: "A11?A11", unblock: "A11?A12&&A13&&A14&&A15&&A16&&A17&&A18&&A19&&A110&&A111&&A112", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.1", "A11");		
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.2", master: "A21", required: "", requiredif: "A21?A21", unblock: "A21?A22&&A23&&A24&&A25&&A26&&A27&&A28&&A29&&A210&&A211&&A212", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.2", "A21");		
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.3", master: "A31", required: "", requiredif: "A31?A31", unblock: "A31?A32&&A33&&A34&&A35&&A36&&A37&&A38&&A39&&A310&&A311&&A312", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.3", "A31");	
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.4", master: "A41", required: "", requiredif: "A41?A41", unblock: "A41?A42&&A43&&A44&&A45&&A46&&A47&&A48&&A49&&A410&&A411&&A412", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.4", "A41");	
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.5", master: "A51", required: "", requiredif: "A51?A51", unblock: "A51?A52&&A53&&A54&&A55&&A56", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.5", "A51");	
		//--------------------------------------------------------------------------
		
		//------------------------------section B-----------------------------------
		
		//II.4) Descrierea succinta a naturii si limitelor lucrarilor sau a naturii si cantitatii sau valorii bunurilor sau serviciilor
		var divs = {			
			"FIRST": {id: "B.3.1", master: "", required: "", requiredif: "B311?B312****B312?B311****B321?B322&&B323****B322?B321&&B323****B323?B322&&B321", unblock: "", block: "B311?B321&&B322&&B323****B312?B321&&B322&&B323****B321?B311&&B312****B322?B311&&B312****B323?B311&&B312"}
		};
		
		var idBefore = "";
		
		radioDivs(idBefore, divs); 	
				
		//II.6) Data prevazuta pentru începerea procedurilor de atribuire si durata contractului
		divs = {			
			"FIRST": {id: "B.4", master: "", required: "", requiredif: "B416?B417****B417?B416", unblock: "", block: "B414?B415&&B416&&B417****B415?B414&&B416&&B417****B416?B414&&B415****B417?B414&&B415"}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 	
		
});		