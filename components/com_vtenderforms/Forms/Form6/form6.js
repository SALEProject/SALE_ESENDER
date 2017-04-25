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
		//--------------form initialization-----------------------------
		//$("#tabs").tabs("option", "disabled", [5, 6]);
		$("#tabs").tabs("option", "disabled", [5, 6]);
		//--------------------------------------------------------------
		
		/*//--------------section I---------------------------------------
		var purchasingYesNo = (formLang == "RO") ? "DA" : "YES";
		$("#I41").change(function(){
			var val = $("#I41 option:selected").text(); //$("#list option[value='2']").text()
			if(val.toUpperCase() == purchasingYesNo){				
				$("#tabs").tabs("enable", 5);
			}else{
				$("#tabs").tabs("disable", 5);
				clearChildren(document.getElementById("VII.1"));
			}
		});						
		//-------------------------------------------------------------
		*/
		
		//--------------section I--------------------------------------
		//I.2) Activitate principala
		var showHideSelect = new Array("I21");
		var showHideOption = new Array("I.2.2");		
		var showHideFieldRequired = new Array("I22");
				  
		for(var i = 0; i < showHideSelect.length; i++){			
			var idSelect = showHideSelect[i];			
			var idOption = showHideOption[i];
			var idRequired = showHideFieldRequired[i];	
			
			showHideRequired(idSelect, idOption, idRequired);					
		}	
					
		//I.3) Atribuirea contractului în numele altor entitati contractante
		showTabSingleSelector("I31", new Array("F6#I32#PURCHASING_ON_BEHALF_YES"), "6", new Array("VII.1"));			
		//-------------------------------------------------------------
		
		
		//--------------section II-------------------------------------		
		//II.1.2) Tipul contractului si locul de executare a lucrarilor, de livrare a produselor sau de prestare a serviciilor
		var multiCaseSelect = {
			"FIRST":{selectValue: "WORKS", shDiv: "II.1.2.3", required: "II123"},
			"SECOND":{selectValue: "SUPPLIES", shDiv: "II.1.2.2", required: "II122"},
			"THIRD":{selectValue: "SERVICES", shDiv: "II.1.2.4&&II.1.2.5", required: "II124"},
			"FOURTH":{selectValue: "", isEmpty: "true"}
		};
					
		$("#II121").change(function(){
			var selectedOption = $("#II121 option:selected").val();
			handleMultiCaseSelect(multiCaseSelect, selectedOption);
		});							
		
		//II.2) Valoarea totala finala a contractului sau a contractelor	
		var divs = {
			"FIRST":{id: "II.2.1", master: "II211", required: "", requiredif: "II211?II212****II213:id='F6#II2131#EXCLUDING_VAT'?II214", unblock: "II211?II212&&II213****II213?II214", block: ""},
			"SECOND": {id: "II.2.2", master: "II215", required: "", requiredif: "II215?II216&&II217****II218:id='F6#II2182#EXCLUDING_VAT'?II219", unblock: "II215?II216&&II217&&II218****II218?II219", block: ""}
		};				
		
		var idBefore = "II\\.2\\.1";		
		
		var nr = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").attr("checked", true);
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").change();
				
		//-------------------------------------------------------------	
		
		
		//--------------section IV-------------------------------------						
		
		//I.3) Atribuirea contractului în numele altor entitati contractante
		showTabSingleSelector("IV111", new Array("F6#IV1115#F06_AWARD_WITHOUT_PRIOR_PUBLICATION", "F6#IV1114#F06_PT_NEGOTIATED_WITHOUT_COMPETITION"), "7", new Array("D.1.1", "D.1.2"));			
		
		//-------------------------------------------------------------	
		
		
		//--------------section IV-------------------------------------						
		//V.1.3) Numele si adresa operatorului economic în favoarea caruia s-a luat o decizie de atribuire a contractului
		var divs = {
			"FIRST": {id: "V.1.3", master: "V131", required: "", requiredif: "V131?V131", unblock: "V131?V132&&V133&&V134&&V135&&V136&&V137&&V138&&V139&&V140", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("V\\.1\\.3", "V131");	
		
		
		//V.1.4) Informatii privind valoarea contractului
		divs = {
			"FIRST": {id: "V.1.4.1", master: "V1411", required: "", requiredif: "V1411?V1412****V1413:id='F6#V14131#EXCLUDING_VAT'?V1414", unblock: "V1411?V1412&&V1413****V1413?V1414", block: ""},
			"SECOND": {id: "V.1.4.2.1", master: "V1415", required: "", requiredif: "V1415?V1416****V1417:id='F6#V14171#EXCLUDING_VAT'?V1418", unblock: "V1415?V1416&&V1417****V1417?V1418", block: ""},
			"THIRD": {id: "V.1.4.2.2", master: "V1419", required: "", requiredif: "V1419?V1420&&V1421****V1422:id='F6#V14221#EXCLUDING_VAT'?V1423", unblock: "V1419?V1420&&V1421&&V1422****V1422?V1423", block: ""},
			"FOURTH": {id: "V.1.4.3", master: "", required: "", requiredif: "", unblock: "", block: "V1424?V1425****V1425?V1424"},
		};
		
		idBefore = "V\\.1\\.4\\.1";
		
		var nr1 = radioDivs(idBefore, divs);		
		$("#radioDiv_" + nr1 + "_" + "V\\.1\\.4\\.1").attr("checked", true);
		$("#radioDiv_" + nr1 + "_" + "V\\.1\\.4\\.1").change();
		
		
		//V.1.5) Este posibila subcontractarea
		divs = {			
			"FIRST": {id: "V.1.5.2", master: "", required: "", requiredif: "V153?V154****V154?V153****V157?V153&&V155", unblock: "", block: "V153?V155&&V156****V154?V155&&V156****V155?V153&&V154&&V156****V156?V153&&V154&&V155&&V157****V157?V156"}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		
		//V.1.6) Pretul platit pentru achizitiile de ocazie
		divs = {			
			"FIRST": {id: "V.1.6", master: "", required: "", requiredif: "V161?V162", unblock: "V161?V162", block: ""}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
			
		$("#V161").change();	//just force the V161 to block the V162
		
		//V.2.3) Numele si adresa operatorului economic în favoarea caruia s-a luat o decizie de atribuire a contractului
		divs = {
			"FIRST": {id: "V.2.3", master: "V231", required: "", requiredif: "V231?V231", unblock: "V231?V232&&V233&&V234&&V235&&V236&&V237&&V238&&V239&&V240", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("V\\.2\\.3", "V231");	
		
		//V.2.4) Valoarea totala finala a contractului fara TVA
		divs = {			
			"FIRST": {id: "V.2.4", master: "", required: "", requiredif: "V241?V241", unblock: "V241?V242", block: ""}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		$("#V241").change();	//just force the V161 to block the V162
		
		//V.2.5) Tara de origine a produsului sau a serviciului
		divs = {			
			"FIRST": {id: "V.2.4", master: "", required: "", requiredif: "V251:id='F6#V2512#NO_COMMUNITY_ORIGIN'?V252", unblock: "V251?V252", block: ""}
		};		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		$("#V251").change();	//just force the V161 to block the V162			
		//-------------------------------------------------------------
		
		
		//--------------section IV-------------------------------------
		//VI.1) Contractul se refera la un proiect si/sau program finantat din fonduri ale Uniunii Europene
		divs = {			
			"FIRST": {id: "VI.1", master: "", required: "", requiredif: "VI11:id='F6#VI111#RELATES_TO_EU_PROJECT_YES'?VI12", unblock: "VI11?VI12", block: ""}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		$("#VI11").change();	//just force the V161 to block the V162
		
		//VI.3.1) Organismul competent pentru caile de atac
		var divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI3120", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3111");	
		
		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		var divs = {
			"FIRST": {id: "VI.3.1.2", master: "VI3121", required: "", requiredif: "VI3121?VI3121", unblock: "VI3121?VI3122&&VI3123&&VI3124&&VI3125&&VI3126&&VI3127&&VI3128&&VI3129&&VI3130", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3121");
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		var divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI340", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");		
		//-------------------------------------------------------------
		
		$( ".radio" ).buttonset();	
});		