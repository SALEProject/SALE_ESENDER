$(document).ready(function(){				
		$(document).tooltip();		
		
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
	
	$("#tabs").tabs("option", "disabled", [5]);
	//------------------------section I ---------------------------------------------	
	//Alte informatii pot fi obtinute de la
	//Documente suplimentare pot fi obtinute de la
	//Cererile de participare sau candidaturile trebuie trimise la
	
	var selectors = {
		"FIRST":	{idSelect: "I1116", option: "value=A.I", idTargetDiv: "A.I"},
		"SECOND":	{idSelect: "I1117", option: "value=A.II", idTargetDiv: "A.II"},
		"THIRD":	{idSelect: "I1118", option: "value=A.III", idTargetDiv: "A.III"},
		"FOURTH":	{idSelect: "I31", option: "id=F7#I32#PURCHASING_ON_BEHALF_YES", idTargetDiv: "A.IV"},
	};
	
	showTabMultiSelectors(selectors, 5);
	
	
	//I.2) Activitate principala
	//VI.3.1.2) Organismul competent pentru procedurile de mediere
	
	$("#I21").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "I.2.2")
			$("#I23").addClass("required");
		else{
			$("#I23").removeClass("required");
			$("#I23").removeClass("error");
		}	
		
	});
	//-------------------------------------------------------------------------------
	
	//------------------------section II ---------------------------------------------	
	//II.2) Tip de contract
	$("#II21").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "II.2.2")
			$("#II22").addClass("required");
		else{
			$("#II22").removeClass("required");
			$("#II22").removeClass("error");
		}	
		
	});
	
	//-------------------------------------------------------------------------------
	
	//------------------------section IV --------------------------------------------	
	//IV.1.1) Criterii de atribuire
	$("#IV111").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "IV.1.1.2")
			$("#IV112").addClass("required");
		else{
			$("#IV112").removeClass("required");
			$("#IV112").removeClass("error");
			clearChildren(document.getElementById("IV.1.1.3"));
			$("#IV\\.1\\.1\\.3").hide();
			
		}			
	});
	
	$("#IV112").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "IV.1.1.3"){
			$("#IV113").addClass("required");
			$("#IV114").addClass("required");
		}	
		else{
			$("#IV113").removeClass("required");
			$("#IV113").removeClass("error");			
			$("#IV114").removeClass("required");
			$("#IV114").removeClass("error");	
		}			
	});
	
	//IV.1.2) Informatii despre licitatia electronica
	$("#IV121").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "IV.1.2.2")
			$("#IV122").addClass("required");
		else{
			$("#IV122").removeClass("required");
			$("#IV122").removeClass("error");
		}	
		
	});
	
	//IV.2.2) Durata sistemului de calificare
	var divs = {
			"FIRST": {id: "IV.2.2", master: "", required: "", requiredif: "IV221?IV222****IV222?IV221", unblock: "", block: "IV221?IV223&&IV224****IV222?IV223&&IV224****IV223?IV221&&IV222&&IV224****IV224?IV223&&IV222&&IV221"}
	};
	
	idBefore = "";
		
	radioDivs(idBefore, divs);
	
	
	//IV.2.3) Informatii privind reînnoirile	
	$("#IV231").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "IV.2.3.2")
			$("#IV232").addClass("required");
		else{
			$("#IV232").removeClass("required");
			$("#IV232").removeClass("error");
		}	
		
	});
	//-------------------------------------------------------------------------------
	
	//-------------------------section V---------------------------------------------
	
	//VI.1) Informatii despre fondurile Uniunii Europene
	$("#VI11").change(function(){
		var selectedOption = $("option:selected", this).attr("value");
		
		if(selectedOption == "VI.1.2")
			$("#VI12").addClass("required");
		else{
			$("#VI12").removeClass("required");
			$("#VI12").removeClass("error");
		}			
	});
		
	//VI.3.1.1) Organismul competent pentru caile de atac
	divs = {
		"FIRST": {id: "VI.3.1.1", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI31110", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3111");		
	
	//VI.3.1.2) Organismul competent pentru procedurile de mediere
	divs = {
		"FIRST": {id: "VI.3.1.2", master: "VI3121", required: "", requiredif: "VI3121?VI3121", unblock: "VI3121?VI3122&&VI3123&&VI3124&&VI3125&&VI3126&&VI3127&&VI3128&&VI3129&&VI3130", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3121");	

	//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
	
	divs = {
		"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI3310", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("VI\\.3\\.3", "VI331");	
	//-------------------------------------------------------------------------------
	
	
	//-------------------------section V---------------------------------------------
	
	divs = {
		"FIRST": {id: "A.I", master: "AI1", required: "", requiredif: "AI1?AI1", unblock: "AI1?AI2&&AI3&&AI4&&AI5&&AI6&&AI7&&AI8&&AI9&&AI10&&AI11&&AI12", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("A\\.I", "AI1");	
	
	divs = {
		"FIRST": {id: "A.II", master: "AII1", required: "", requiredif: "AII1?AII1", unblock: "AII1?AII2&&AII3&&AII4&&AII5&&AII6&&AII7&&AII8&&AII9&&AII10&&AII11&&AII12", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("A\\.II", "AII1");	
	
	divs = {
		"FIRST": {id: "A.III", master: "AIII1", required: "", requiredif: "AIII1?AIII1", unblock: "AIII1?AIII2&&AIII3&&AIII4&&AIII5&&AIII6&&AIII7&&AIII8&&AIII9&&AIII10&&AIII11&&AIII12", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("A\\.III", "AIII1");	
	
	divs = {
		"FIRST": {id: "A.IV", master: "AIV1", required: "", requiredif: "AIV1?AIV1", unblock: "AIV1?AIV2&&AIV3&&AIV4&&AIV5&&AIV6", block: ""}
	};
	idBefore = "";
	
	radioDivs(idBefore, divs);
	disableFieldsInDiv("A\\.IV", "AIV1");	
	
	//-------------------------------------------------------------------------------
});		