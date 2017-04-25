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
		//--------------------------------------------------------------		
		
		//------------------------section I-----------------------------
		//I.0) Acest concurs este reglementat de		
		$("#P1").change(function(){
			var selectedOption = $("option:selected", this).attr("value");
			if(selectedOption == "DIRECTIVE_2004_18"){
				$("#I\\.3\\.0").show();				
				$("#I\\.3\\.2").hide();
				$("#I\\.3\\.3").hide();				
				$("#I\\.2").hide();
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.2", "error");
				removeClassInDiv("I\\.3\\.3", "error");	
				clearChildren(document.getElementById("I.3.2"));
				clearChildren(document.getElementById("I.3.3"));
			}
			else if(selectedOption == "DIRECTIVE_2004_17"){
				$("#I\\.3\\.2").show();				
				$("#I\\.2").show();				
				$("#I\\.3\\.0").hide();
				$("#I\\.3\\.1").hide();
				removeClassInDiv("I\\.3\\.0", "required");
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.0", "error");
				removeClassInDiv("I\\.3\\.1", "error");	
				clearChildren(document.getElementById("I.3.0"));
				clearChildren(document.getElementById("I.3.1"));
			}
			else{
				$("#I\\.3\\.2").hide();
				$("#I\\.3\\.3").hide();
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.2", "error");
				removeClassInDiv("I\\.3\\.3", "error");	
				clearChildren(document.getElementById("I.3.2"));
				clearChildren(document.getElementById("I.3.3"));
				$("#I\\.3\\.0").hide();
				$("#I\\.3\\.1").hide();
				removeClassInDiv("I\\.3\\.0", "required");
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.0", "error");
				removeClassInDiv("I\\.3\\.1", "error");	
				clearChildren(document.getElementById("I.3.0"));
				clearChildren(document.getElementById("I.3.1"));
			}
		});
		
		$("#P1").change();
		
		
		//Alte informatii pot fi obtinute de la
		//Documente suplimentare pot fi obtinute de la
		//Proiectele sau cererile de participare trebuie trimise la:
		var selectors = {
			"FIRST":	{idSelect: "I114", option: "value=A.I", idTargetDiv: "A.I"},
			"SECOND":	{idSelect: "I115", option: "value=A.II", idTargetDiv: "A.II"},
			"THIRD":	{idSelect: "I116", option: "value=A.III", idTargetDiv: "A.III"},
			"FOURTH":	{idSelect: "I41", option: "value=A.IV", idTargetDiv: "A.IV"},
		};
		
		showTabMultiSelectors(selectors, 5);
		
		//I.2) Tipul autoritatii contractante
		dependentRequiredField("I20", "I22", "value", "I.2.2");
		
		//I.3) Activitate principala
		dependentRequiredField("I30", "I3111", "value", "I.3.1");
		dependentRequiredField("I3120", "I323", "value", "I.3.3");			
		//--------------------------------------------------------------
		
		//------------------------section I-----------------------------
		//III.2) Informatii privind o anumita profesie
		dependentRequiredField("III21", "III22", "value", "III.2.2");
		//--------------------------------------------------------------
		
		//------------------------section IV----------------------------
		//IV.1) Tip de concurs
		var divs = {			
			"FIRST": {id: "IV.1.1", master: "", required: "", requiredif: "IV13?IV14****IV14?IV13", unblock: "", block: "IV12?IV13&&IV14****IV13?IV12****IV14?IV12"}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 	
		
		//IV.4.2) Conditii de obtinere a documentelor contractuale si a documentelor suplimentare
		//Documente contra cost
		$("#IV4221").change(function(){			
			var selectedOption = $("option:selected", this).attr("id");
			
			if(selectedOption == "F12#IV42211#PAYABLE_DOCUMENTS"){
				$("#IV\\.4\\.2\\.3").show();
			}
		});
		
		divs = {			
			"FIRST": {id: "IV.4.2.3", master: "IV4231", required: "", requiredif: "IV4231?IV4232", unblock: "IV4231?IV4232&&IV4233", block: ""}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 	
		disableFieldsInDiv("IV\\.4\\.2\\.3", "IV4231");		
		

		//IV.5.1) Informatii privind premiul (premiile)
		
		dependentRequiredField("IV511", "IV512", "value", "IV.5.1.1");
		//--------------------------------------------------------------
		
		//------------------------section V-----------------------------
		//VI.1) Informatii despre fondurile Uniunii Europene		
		dependentRequiredField("VI11", "VI12", "value", "VI.1.1");
		
		//VI.3.1) Organismul competent pentru caile de atac
		divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI31110", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3111");	

		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		divs = {
			"FIRST": {id: "VI.3.1.2", master: "VI3121", required: "", requiredif: "VI3121?VI3121", unblock: "VI3121?VI3122&&VI3123&&VI3124&&VI3125&&VI3126&&VI3127&&VI3128&&VI3129&&VI31210", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3121");			
		
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI33910", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");			
		
		//--------------------------------------------------------------
		
		//------------------------section IV----------------------------		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.I", master: "AI1", required: "", requiredif: "AI1?AI1", unblock: "AI1?AI2&&AI3&&AI4&&AI5&&AI6&&AI7&&AI8&&AI9&&AI10&&AI11&&AI12", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.I", "AI1");
		
		//A.II) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.II", master: "AII1", required: "", requiredif: "AII1?AII1", unblock: "AII1?AII2&&AII3&&AII4&&AII5&&AII6&&AII7&&AII8&&AII9&&AII10&&AII11&&AII12", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.II", "AII1");
		
		//A.III) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.III", master: "AIII1", required: "", requiredif: "AIII1?AIII1", unblock: "AIII1?AIII2&&AIII3&&AIII4&&AIII5&&AIII6&&AIII7&&AIII8&&AIII9&&AIII10&&AIII11&&AIII12", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.III", "AIII1");
		
		//A.IV) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.IV", master: "AIV1", required: "", requiredif: "AIV1?AIV1", unblock: "AIV1?AIV2&&AIV3&&AIV4&&AIV5&&AIV6", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.IV", "AIV1");
		//--------------------------------------------------------------
});