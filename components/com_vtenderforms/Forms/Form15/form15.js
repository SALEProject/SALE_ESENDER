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
		$("#tabs").tabs("option", "disabled", [5, 6]);
		//---------------------section I-----------------------
		//I.0) Acest concurs este reglementat de		
		$("#P1").change(function(){
			var selectedOption = $("option:selected", this).attr("value");
			if(selectedOption == "CONTRACTING_AUTHORITY"){
				$("#I\\.3\\.1").show();				
				$("#I\\.3\\.3").hide();
				$("#I\\.3\\.4").hide();				
				$("#I\\.2").hide();
				$("#II\\.1\\.3").show();
				$("#II\\.1\\.6").show();
				$("#V\\.5\\.4").show();
				removeClassInDiv("I\\.3\\.3", "required");
				removeClassInDiv("I\\.3\\.4", "required");
				removeClassInDiv("I\\.3\\.3", "error");
				removeClassInDiv("I\\.3\\.4", "error");	
				clearChildren(document.getElementById("I.3.3"));
				clearChildren(document.getElementById("I.3.4"));
				clearChildren(document.getElementById("II.1.2.2"));
				$("#II\\.1\\.2\\.2").hide();
				$("#II\\.1\\.2\\.1").show();
			}
			else if(selectedOption == "CONTRACTING_ENTITY"){
				$("#I\\.3\\.3").show();				
				$("#I\\.2").show();				
				$("#I\\.3\\.1").hide();
				$("#I\\.3\\.2").hide();
				$("#II\\.1\\.3").show();
				$("#II\\.1\\.6").show();
				$("#V\\.5\\.4").show();
				removeClassInDiv("I\\.3\\.1", "required");
				removeClassInDiv("I\\.3\\.2", "required");
				removeClassInDiv("I\\.3\\.1", "error");
				removeClassInDiv("I\\.3\\.2", "error");	
				clearChildren(document.getElementById("I.3.1"));
				clearChildren(document.getElementById("I.3.2"));
				clearChildren(document.getElementById("II.1.2.2"));
				$("#II\\.1\\.2\\.2").hide();
				$("#II\\.1\\.2\\.1").show();
			}
			/*else if (if(selectedOption == "CONTRACTING_ENTITY"){
				$("#II\\.1\\.3").show();
				$("#II\\.1\\.6").show();
				$("#V\\.5\\.4").show();
				$("#I\\.3\\.3").hide();
				$("#I\\.3\\.4").hide();
				$("#II\\.1\\.3").hide();
				$("#II\\.1\\.6").hide();
				$("#V\\.5\\.4").hide();	
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
			}*/
			else{
				$("#II\\.1\\.3").show();
				$("#II\\.1\\.6").show();
				$("#V\\.5\\.4").show();
				$("#I\\.3\\.3").hide();
				$("#I\\.3\\.4").hide();
				$("#II\\.1\\.3").hide();
				$("#II\\.1\\.6").hide();
				$("#V\\.5\\.4").hide();	
				clearChildren(document.getElementById("II.1.2.1"));
				$("#II\\.1\\.2\\.1").hide();
				$("#II\\.1\\.2\\.2").show();
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
		//I.2) Tipul autoritatii contractante
		dependentRequiredField("I21", "I22", "value", "I.2.2");				
		
		//I.3) Activitate principala
		dependentRequiredField("I31", "I32", "value", "I.3.2");				
		dependentRequiredField("I33", "I34", "value", "I.3.4");				
		
		//I.4) Atribuirea contractului în numele altor autoritati/entitati contractante
		var selectors = {
			"FIRST":	{idSelect: "I41", option: "id=F15#I42#PURCHASING_ON_BEHALF_YES", idTargetDiv: "A.I"}			
		};
		
		showTabMultiSelectors(selectors, 5);
		
		//II.1.2) Tipul contractului si locul de executare a lucrarilor, de livrare a produselor sau de prestare a serviciilor
		var multiCaseSelect = {
			"FIRST":{selectValue: "WORKS", shDiv: "II.1.2.1.3", required: "II12131"},
			"SECOND":{selectValue: "SUPPLIES", shDiv: "II.1.2.1.2", required: "II12121"},
			"THIRD":{selectValue: "SERVICES", shDiv: "II.1.2.1.4", required: "II12141"},
			"FOURTH":{selectValue: "", isEmpty: "true"}
		};
		
		$("#II12111").change(function(){
			var selectedOption = $("#II12111 option:selected").val();
			handleMultiCaseSelect(multiCaseSelect, selectedOption);
		});				
		
		var multiCaseSelect = {
			"FIRST":{selectValue: "WORKS", shDiv: "II.1.2.2.3", required: "II12231"},
			"SECOND":{selectValue: "SUPPLIES", shDiv: "II.1.2.2.2", required: "II12221"},
			"THIRD":{selectValue: "SERVICES", shDiv: "II.1.2.2.4", required: "II12241"},
			"FOURTH":{selectValue: "", isEmpty: "true"}
		};
		
		$("#II12211").change(function(){
			var selectedOption = $("#II12211 option:selected").val();
			handleMultiCaseSelect(multiCaseSelect, selectedOption);
		});				
		
		//II.2) Valoarea totala finala a contractului sau a contractelor
		var divs = {
			"FIRST":{id: "II.2.1", master: "II211", required: "", requiredif: "II211?II212****II213:id='F15#II2132#EXCLUDING_VAT'?II214", unblock: "II211?II212&&II213****II213?II214", block: ""},
			"SECOND": {id: "II.2.2", master: "II215", required: "", requiredif: "II215?II216&&II217****II218:id='F15#II2182#EXCLUDING_VAT'?II219", unblock: "II215?II216&&II217&&II218****II218?II219", block: ""}
		};				
		
		var idBefore = "II\\.2\\.1";		
		
		var nr = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").attr("checked", true);
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").change();
		//---------------------------------------------------------------
		
		//----------------------section II-------------------------------
		$("#IV111").change(function(){
			var selectedOption = $("option:selected", this).attr("id");
			var exAnteOption = $("#P1 option:selected").attr("value");
			switch (selectedOption){
				case "F15#IV111a#F15_PT_NEGOTIATED_WITHOUT_COMPETITION": 
					$("#tabs").tabs("enable", 6);
					switch(exAnteOption){
						case "CONTRACTING_AUTHORITY": hideDivsInD(); $("#D\\.1\\.1").show(); break;
						case "CONTRACTING_DEFENCE": hideDivsInD(); $("#D\\.3\\.1").show(); break;
						case "CONTRACTING_ENTITY": hideDivsInD(); $("#D\\.2\\.1").show(); break;
					}									
				break;
				case "F15#IV111b#F15_AWARD_WITHOUT_PRIOR_PUBLICATION": 
					$("#tabs").tabs("enable", 6);					
					switch(exAnteOption){
						case "CONTRACTING_AUTHORITY": hideDivsInD(); $("#D\\.1\\.2").show(); break;
						case "CONTRACTING_DEFENCE": hideDivsInD(); $("#D\\.3\\.2").show(); break;
						case "CONTRACTING_ENTITY": hideDivsInD(); $("#D\\.2\\.2").show(); break;
					}									
				break;
				default: $("#tabs").tabs("disable", 6);
			}
			
		});
				
		
		$("#II12211").change(function(){
			var selectedOption = $("option:selected", this).attr("value");
			
			switch(selectedOption){
				case "WORKS": 
					
					$("#D\\.1\\.1\\.1").show();
					$("#D\\.1\\.2\\.1").show(); 
				break;				
				case "SUPPLIES":
					$("#D\\.1\\.2\\.2").show();
					$("#D\\.2\\.1\\.2").show();					
				break;
				case "SERVICES": 								
					$("#D\\.2\\.1\\.3").show();
					$("#D\\.2\\.2\\.3").show();					
				break;			
				default: 
					$("#D\\.1\\.1\\.1").hide();
					$("#D\\.1\\.2\\.1").hide();
					$("#D\\.1\\.2\\.2").hide();
					$("#D\\.2\\.1\\.2").hide();
					$("#D\\.2\\.1\\.3").hide();
					$("#D\\.2\\.2\\.3").hide();
			}
		});
		
		$("#II12111").change(function(){
			var selectedOption = $("option:selected", this).attr("value");			
			
			switch(selectedOption){
				case "WORKS": 
					
					$("#D\\.1\\.1\\.1").show();
					$("#D\\.1\\.2\\.1").show(); 
				break;				
				case "SUPPLIES":
					$("#D\\.1\\.2\\.2").show();
					$("#D\\.2\\.1\\.2").show();					
				break;
				case "SERVICES": 								
					$("#D\\.2\\.1\\.3").show();
					$("#D\\.2\\.2\\.3").show();					
				break;			
				default: 
					$("#D\\.1\\.1\\.1").hide();
					$("#D\\.1\\.2\\.1").hide();
					$("#D\\.1\\.2\\.2").hide();
					$("#D\\.2\\.1\\.2").hide();
					$("#D\\.2\\.1\\.3").hide();
					$("#D\\.2\\.2\\.3").hide();
			}
		});
		
		function hideDivsInD(){
			$("#D\\.1\\.1").hide();
			$("#D\\.1\\.2").hide();
			$("#D\\.2\\.1").hide();
			$("#D\\.2\\.2").hide();
			$("#D\\.3\\.1").hide();
			$("#D\\.3\\.2").hide();					
		}
		//---------------------------------------------------------------
		
		//----------------------section IV-------------------------------
		//V.4) Informatii privind valoarea contractului
		divs = {
			"FIRST": {id: "V.4.1", master: "V41", required: "", requiredif: "V41?V42****V43:id='F15#V431#EXCLUDING_VAT'?V44", unblock: "V41?V42&&V43****V43?V44", block: ""},
			"SECOND": {id: "V.4.2.1", master: "V45", required: "", requiredif: "V45?V46****V47:id='F15#V471#EXCLUDING_VAT'?V48", unblock: "V45?V46&&V47****V47?V48", block: ""},
			//"THIRD": {id: "V.4.2.2", master: "V49", required: "", requiredif: "V49?V410&&V411****V412:id='F3#V4121#EXCLUDING_VAT'?V413", unblock: "V49?V410&&V411&&V412&&V414&&V415****V412?V413", block: ""},
			"THIRD": {id: "V.4.2.2", master: "V49", required: "", requiredif: "V49?V410&&V411****V412:id='F15#V4121#EXCLUDING_VAT'?V413", unblock: "V49?V410&&V411&&V412****V412?V413", block: ""},
			"FOURTH": {id: "V.4.3", master: "", required: "", requiredif: "", unblock: "", block: "V414?V415****V415?V414"},
		};
		
		idBefore = "V\\.4\\.1";
		
		var nr1 = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr1 + "_" + "V\\.4\\.1").attr("checked", true);
		$("#radioDiv_" + nr1 + "_" + "V\\.4\\.1").change();
		
		//V.5) Informatii privind subcontractarea
		divs = {
			"FIRST": {id: "V.5.2", master: "V52", required: "", requiredif: "V52?V53", unblock: "", block: "V52?V54&&V55****V54?V52&&V55****V55?V52&&V54"}
		};	
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		//-------------------------------------------------------------
		
		
		//----------------------section IV-------------------------------
		//VI.1) Informatii privind subcontractarea
		divs = {
			"FIRST": {id: "VI.1", master: "VI11", required: "", requiredif: "VI11?VI12", unblock: "VI11?VI12", block: ""}
		};	
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		disableFieldsInDiv("VI\\.1", "VI11");		
		
		//VI.3.1) Organismul competent pentru caile de atac
		divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI311", required: "", requiredif: "VI311?VI311", unblock: "VI311?VI312&&VI313&&VI314&&VI315&&VI316&&VI317&&VI318&&VI319&&VI3110", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI311");	

		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		divs = {
			"FIRST": {id: "VI.3.1.2", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI3120", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3111");			
		
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI3310", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");			
		//-------------------------------------------------------------
		
		//----------------------section VI-----------------------------
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.I", master: "AI1", required: "", requiredif: "AI1?AI1", unblock: "AI1?AI2&&AI3&&AI4&&AI5&&AI6", block: ""}
		};
		idBefore = "";			
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.I", "AI1");
		//-------------------------------------------------------------
		
		
		$( ".radio" ).buttonset();	
	});	