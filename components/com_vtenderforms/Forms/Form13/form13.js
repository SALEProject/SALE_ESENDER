
  
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
		$("#tabs").tabs("option", "disabled", [5]);
		
		//--------------------section I---------------------------------
		//I.0) Rezultatele concursului de proiecte
		$("#P1").change(function(){
			var selectedOption = $("option:selected", this).attr("value");
			if(selectedOption == "DIRECTIVE_2004_18"){
				$("#I\\.3\\.1").show();				
				$("#I\\.3\\.3").hide();
				$("#I\\.3\\.4").hide();				
				$("#I\\.2").hide();
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.4", "required");
				removeClassInDiv("I\\.3\\.3", "error");
				removeClassInDiv("I\\.3\\.4", "error");	
				clearChildren(document.getElementById("I.3.3"));
				clearChildren(document.getElementById("I.3.4"));
			}
			else if(selectedOption == "DIRECTIVE_2004_17"){
				$("#I\\.3\\.3").show();				
				$("#I\\.2").show();				
				$("#I\\.3\\.1").hide();
				$("#I\\.3\\.2").hide();
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.1", "error");
				removeClassInDiv("I\\.3\\.2", "error");	
				clearChildren(document.getElementById("I.3.1"));
				clearChildren(document.getElementById("I.3.2"));
			}
			else{
				$("#I\\.3\\.3").hide();
				$("#I\\.3\\.4").hide();
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.4", "required");
				removeClassInDiv("I\\.3\\.3", "error");
				removeClassInDiv("I\\.3\\.4", "error");	
				clearChildren(document.getElementById("I.3.3"));
				clearChildren(document.getElementById("I.3.4"));
				$("#I\\.3\\.1").hide();
				$("#I\\.3\\.2").hide();
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.1", "error");
				removeClassInDiv("I\\.3\\.2", "error");	
				clearChildren(document.getElementById("I.3.1"));
				clearChildren(document.getElementById("I.3.2"));
			}
		});
		
		$("#P1").change();
		
		//I.4) Atribuirea contractului în numele altor autoritati/entitati contractante
		var selectors = {
			"FIRST":	{idSelect: "I41", option: "id=F13#I42#PURCHASING_ON_BEHALF_YES", idTargetDiv: "A.I"}			
		};
		
		showTabMultiSelectors(selectors, 5);
		
		
		//-------------------------------------------------------------------
		//-------------------------section III-------------------------------
		//IV.1.2) Informatii despre publicarile anterioare
		dependentRequiredField("IV121", "IV122", "value", "IV.1.2.1");				
		//-------------------------------------------------------------------
		
		//-------------------------section IV--------------------------------
		//V.1.4) Valoarea premiului (premiilor)
		var divs = {
			"FIRST": {id: "V.1.4", master: "V21", required: "", requiredif: "V21?V22", unblock: "V21?V22", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("V\\.1\\.4", "V21");					
		//------------------------------------------------------------------
		
		//-------------------------section V--------------------------------
		//VI.1) Informatii despre fondurile Uniunii Europene
		var divs = {
			"FIRST": {id: "VI.1", master: "VI11", required: "", requiredif: "VI11:id='F13#VI111#RELATES_TO_EU_PROJECT_YES'?VI12", unblock: "VI11?VI12", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.1", "VI11");					
		
		//VI.3.1) Organismul competent pentru caile de atac
		divs = {
			"FIRST": {id: "VI.3.1.0", master: "VI311", required: "", requiredif: "VI311?VI311", unblock: "VI311?VI312&&VI313&&VI314&&VI315&&VI316&&VI319&&VI3110&&VI3111&&VI3112", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.0", "VI311");	

		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI3113", required: "", requiredif: "VI3113?VI3113", unblock: "VI3113?VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3121&&VI3122&&VI3123&&VI3124", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3113");			
		
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI339&&VI3310&&VI3311&&VI3312", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");			
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.I", master: "AI1", required: "", requiredif: "AI1?AI1", unblock: "AI1?AI2&&AI3&&AI4&&AI5&&AI6", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.I", "AI1");
		//------------------------------------------------------------------
});