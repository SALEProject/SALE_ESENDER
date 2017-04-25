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
		//$("#tabs").tabs("option", "disabled", [4, 5]);
		$("#tabs").tabs("option", "disabled", [5, 6]);
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
		

		var selectors = {
			"FIFTH":	{idSelect: "I41", option: "id=F18#I42#PURCHASING_ON_BEHALF_YES", idTargetDiv: "A.1"},
		};
		showTabMultiSelectors(selectors, 5);	
		
		//------------------------------------------------------------------------------------------------------------
		
		//------------------------------------section II--------------------------------------------------------------
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
			"FIRST": {id: "II.2.1", master: "II211", required: "", requiredif: "II211?II212****II213:id='F18#II2131#EXCLUDING_VAT'?II2134", unblock: "II211?II212&&II213****II213?II2134", block: ""},
			"SECOND": {id: "II.2.2.1", master: "II2211", required: "", requiredif: "II2211?II2212****II2213:id='F18#II22131#EXCLUDING_VAT'?II22134", unblock: "II2211?II2212&&II2213****II2213?II22134", block: ""},
			"THIRD": {id: "II.2.2.2", master: "II2221", required: "", requiredif: "II2221?II2223&&II2223****II2224:id='F18#II22241#EXCLUDING_VAT'?II22243", unblock: "II2221?II2222&&II2223&&II2224****II2224?II22243", block: ""},
		};
		
		var idBefore = "II\\.2\\.1";
		
		var nr1 = radioDivs(idBefore, divs);
		$("#radioDiv_" + nr1 + "_" + idBefore).attr("checked", true);
		$("#radioDiv_" + nr1 + "_" + idBefore).change();
		//------------------------------------------------------------------------------------------------------------
		
		
		//--------------------------------------section III-----------------------------------------------------------
				
		selectors = {
			"FIRST":	{idSelect: "IV111", option: "id=F18#IV1116#NEGOTIATED_WITHOUT_CONTRACT_PUBLICATION", idTargetDiv: "D.1"},			
		};
		showTabMultiSelectors(selectors, 6);
		
		//------------------------------------------------------------------------------------------------------------
		
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
		
		//V.5) Informatii privind subcontractarea
		divs = {
			/*"FIRST": {id: "V.5.2", master: "V52", required: "", requiredif: "V52?V53****V43:id='F3#V431#EXCLUDING_VAT'?V44", unblock: "V41?V42&&V43****V43?V44", block: ""}*/
			/*"FIRST": {id: "V.5.2", master: "", required: "", requiredif: "V52?V53****V53?V52****V56?V52&&V54", unblock: "", block: "V52?V54&&V55****V53?V54&&V55****V54?V52&&V53&&V55****V55?V52&&V53&&V54&&V56****V56?V55"}*/
			"FIRST": {id: "V.5.2", master: "", required: "", requiredif: "V52?V53****V53?V52", unblock: "", block: "V52?V54&&V55****V53?V54&&V55****V54?V52&&V53&&V55****V55?V52&&V53&&V54"}
		};
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		
		//V.3) Numele si adresa operatorului economic în favoarea caruia s-a luat o decizie de atribuire a contractului
		var divs = {
			"FIRST": {id: "V.3", master: "V31", required: "", requiredif: "V31?V31", unblock: "V31?V32&&V33&&V34&&V35&&V36&&V37&&V38&&V39&&V310&&V311&&V312", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("V\\.3", "V31");		
		
		//VI.1) Informatii privind subcontractarea
		divs = {
			"FIRST": {id: "VI.1", master: "VI11", required: "", requiredif: "VI11?VI12", unblock: "VI11?VI12", block: ""}
		};	
		
		idBefore = "";
		
		radioDivs(idBefore, divs); 
		disableFieldsInDiv("VI\\.1", "VI11");	

		//VI.3.1) Organismul competent pentru caile de atac
		divs = {
			"FIRST": {id: "VI.3.1.1", master: "VI3111", required: "", requiredif: "VI3111?VI3111", unblock: "VI3111?VI3112&&VI3113&&VI3114&&VI3115&&VI3116&&VI3117&&VI3118&&VI3119&&VI31110&&VI31111&&VI31112", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.1", "VI3111");	

		//VI.3.1.2) Organismul competent pentru procedurile de mediere
		divs = {
			"FIRST": {id: "VI.3.1.2", master: "VI3121", required: "", requiredif: "VI3121?VI3121", unblock: "VI3121?VI3122&&VI3123&&VI3124&&VI3125&&VI3126&&VI3127&&VI3128&&VI3129&&VI31210&&VI31211&&VI31212", block: ""}
		};
		idBefore = "";
		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.1\\.2", "VI3121");			
		
		
		//VI.3.3) Serviciul de la care se pot obtine informatii privind utilizarea cailor de atac
		divs = {
			"FIRST": {id: "VI.3.3", master: "VI331", required: "", requiredif: "VI331?VI331", unblock: "VI331?VI332&&VI333&&VI334&&VI335&&VI336&&VI337&&VI338&&VI339&&VI3310&&VI3311&&VI3312", block: ""}
		};
		idBefore = "";		
		radioDivs(idBefore, divs);
		disableFieldsInDiv("VI\\.3\\.3", "VI331");				
		
		//A.I) Adrese si puncte de contact de la care se pot obtine informatii suplimentare
		divs = {
			"FIRST": {id: "A.1", master: "A11", required: "", requiredif: "A11?A11", unblock: "A11?A12&&A13&&A14&&A15&&A16", block: ""}
		};
		radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.1", "A11");	
				
		
		$( ".radio" ).buttonset();	
});