	
	$(document).ready(function(){
		$("#submit").click(function(e){			
			if(verifyRequiredFields()){
				/*$(".DATE").val('');
				$(".DATE").clear();*/
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
		//--------------------------------------------------------------
		
		//--------------section I---------------------------------------
		var showHideSelect = new Array("I31", "I33");
		var showHideOption = new Array("I.2.2", "I.3.2");		
		var showHideFieldRequired = new Array("I32", "I34");
				  
		for(var i = 0; i < showHideSelect.length; i++){			
			var idSelect = showHideSelect[i];			
			var idOption = showHideOption[i];
			var idRequired = showHideFieldRequired[i];	
			
			showHideRequired(idSelect, idOption, idRequired);					
		}	

		
		
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
		
		//--------------section II-------------------------------------		
		
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
					
		var divs = {
			"FIRST":{id: "II.2.1", master: "II211", required: "", requiredif: "II211?II212****II213:id='F3#II2132#EXCLUDING_VAT'?II214", unblock: "II211?II212&&II213****II213?II214", block: ""},
			"SECOND": {id: "II.2.2", master: "II215", required: "", requiredif: "II215?II216&&II217****II218:id='F3#II2182#EXCLUDING_VAT'?II219", unblock: "II215?II216&&II217&&II218****II218?II219", block: ""}
		};				
		
		var idBefore = "II\\.2\\.1";		
		
		var nr = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").attr("checked", true);
		$("#radioDiv_" + nr + "_" + "II\\.2\\.1").change();
				
		//-------------------------------------------------------------		
		
		//--------------section III------------------------------------
		
		$("#IV111").change(function(){
			var id = $("#IV111 option:selected").attr("id");
			
			if(id == "F3#IV1118#F03_AWARD_WITHOUT_PRIOR_PUBLICATION"){
				$("#tabs").tabs("enable", 6);
				$("#IX\\.1").show();
				$("#IX\\.2").hide();
				clearChildren(document.getElementById("IX.2"));
			}
			else if (id == "F3#IV1117#F03_PT_NEGOTIATED_WITHOUT_COMPETITION"){
				$("#tabs").tabs("enable", 6);
				$("#IX\\.2").show();
				$("#IX\\.1").hide();
				clearChildren(document.getElementById("IX.1"));
			}
			else{
				$("#tabs").tabs("disable", 6);
				clearChildren(document.getElementById("IX.1"));
				clearChildren(document.getElementById("IX.2"));
			}	
		});
		
		//-------------------------------------------------------------
		
		//--------------section IV-------------------------------------	
		//V.3) Numele si adresa operatorului economic în favoarea caruia s-a luat o decizie de atribuire a contractului
		var divs = {
			"FIRST": {id: "V.3", master: "V31", required: "", requiredif: "V31?V31", unblock: "V31?V32&&V33&&V34&&V35&&V36&&V37&&V38&&V39&&V40", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("V\\.3", "V31");	
		
		divs = {
			"FIRST": {id: "V.4.1", master: "V41", required: "", requiredif: "V41?V42****V43:id='F3#V431#EXCLUDING_VAT'?V44", unblock: "V41?V42&&V43****V43?V44", block: ""},
			"SECOND": {id: "V.4.2.1", master: "V45", required: "", requiredif: "V45?V46****V47:id='F3#V471#EXCLUDING_VAT'?V48", unblock: "V45?V46&&V47****V47?V48", block: ""},
			//"THIRD": {id: "V.4.2.2", master: "V49", required: "", requiredif: "V49?V410&&V411****V412:id='F3#V4121#EXCLUDING_VAT'?V413", unblock: "V49?V410&&V411&&V412&&V414&&V415****V412?V413", block: ""},
			"THIRD": {id: "V.4.2.2", master: "V49", required: "", requiredif: "V49?V410&&V411****V412:id='F3#V4121#EXCLUDING_VAT'?V413", unblock: "V49?V410&&V411&&V412****V412?V413", block: ""},
			"FOURTH": {id: "V.4.3", master: "", required: "", requiredif: "", unblock: "", block: "V414?V415****V415?V414"},
		};
		
		idBefore = "V\\.4\\.1";
		
		var nr1 = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr1 + "_" + "V\\.4\\.1").attr("checked", true);
		$("#radioDiv_" + nr1 + "_" + "V\\.4\\.1").change();
		
		divs = {
			/*"FIRST": {id: "V.5.2", master: "V52", required: "", requiredif: "V52?V53****V43:id='F3#V431#EXCLUDING_VAT'?V44", unblock: "V41?V42&&V43****V43?V44", block: ""}*/
			"FIRST": {id: "V.5.2", master: "", required: "", requiredif: "V52?V53****V53?V52****V56?V52&&V54", unblock: "", block: "V52?V54&&V55****V53?V54&&V55****V54?V52&&V53&&V55****V55?V52&&V53&&V54&&V56****V56?V55"}
		};
		
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs); 	

			
		//-------------------------------------------------------------
		
		
		//--------------section VI-------------------------------------	
		
		//VI.3.1) Organismul competent pentru caile de atac
		var divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI3120", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3111");	

		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		var divs = {
			"FIRST": {id: "VI.3.1.2", master: "VI3121", required: "", requiredif: "VI3121?VI3121", unblock: "VI3121?VI3122&&VI3123&&VI3124&&VI3125&&VI3126&&VI3127&&VI3128&&VI3129&&VI3130", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3121");			
		
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		var divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI340", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");					
		//-------------------------------------------------------------
		
		

		
		/*$(".dispatchDate").datepicker("setDate", "04/24/2003");
		$(".dispatchDate").change();*/						
			
		$( ".radio" ).buttonset();	
	});