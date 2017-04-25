	
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
		$("#tabs").tabs("option", "disabled", [5]);
		//--------------------------------------------------------------
		
		//-----------------sectiunea I----------------------------------
		//I.2) Alte informatii pot fi obtinute de la
		$("#I1116").change(function(){
			var selectedOption = $("#I1116 option:selected").val();
			
			if(selectedOption == "A.I"){
				$("#tabs").tabs("enable", 5);
				$("#AI1").addClass("required");
			}else{
				//check to see if A.II or A.III is visible
				var visible1 = $("#A\\.II").css("display");
				var visible2 =  $("#A\\.III").css("display");
				if(visible1 == "none")
					visible1 = false;
				else
					visible1 = true;
					
				if(visible2 == "none")
					visible2 = false;
				else
					visible2 = true;
					
				if(!visible1 && !visible2)
					$("#tabs").tabs("option", "disabled", [5]);
				
				$("#A\\.I").hide();
				clearChildren(document.getElementById("A.I"));				
				$("#AI1").removeClass("required");
				$("#AI1").removeClass("error");
			}
		});
		
		//I.3) Caietul de sarcini si documente suplimentare pot fi obtinute de la
		$("#I1160").change(function(){
			var selectedOption = $("#I1160 option:selected").val();
			
			if(selectedOption == "A.II"){
				$("#tabs").tabs("enable", 5);
				$("#AII1").addClass("required");
			}else{
				//check to see if A.I or A.III is visible
				var visible3 = $("#A\\.I").css("display");
				var visible4 =  $("#A\\.III").css("display");
				if(visible3 == "none")
					visible3 = false;
				else
					visible3 = true;
					
				if(visible4 == "none")
					visible4 = false;
				else
					visible4 = true;

				if(!visible3 && !visible4)
					$("#tabs").tabs("option", "disabled", [5]);
				
				$("#A\\.II").hide();
				clearChildren(document.getElementById("A.II"));	
				$("#AII1").removeClass("required");				
				$("#AII1").removeClass("error");		
			}
		});
		
		//I.4) Caietul de sarcini si documente suplimentare pot fi obtinute de la
		$("#I1170").change(function(){
			var selectedOption = $("#I1170 option:selected").val();
			
			if(selectedOption == "A.III"){
				$("#tabs").tabs("enable", 5);
				$("#AIII1").addClass("required");
			}else{
				//check to see if A.I or A.III is visible
				var visible5 = $("#A\\.I").css("display");
				var visible6 =  $("#A\\.II").css("display");
				if(visible5 == "none")
					visible5 = false;
				else
					visible5 = true;
					
				if(visible6 == "none")
					visible6 = false;
				else
					visible6 = true;

				if(!visible5 && !visible6)
					$("#tabs").tabs("option", "disabled", [5]);
				
				$("#A\\.III").hide();
				clearChildren(document.getElementById("A.III"));
				$("#AIII1").removeClass("required");				
				$("#AIII1").removeClass("error");	
			}
		});
		//--------------------------------------------------------------
		
		//-----------------sectiunea II---------------------------------
		
		//II.2.1) Cantitatea totala sau domeniul
		var divs = {
			"FIRST":{id: "II.2.1.2", master: "II212", required: "", requiredif: "II212?II213", unblock: "II212?II213", block: ""},
			"SECOND": {id: "II.2.1.3", master: "II214", required: "", requiredif: "II214?II215&&II216", unblock: "II214?II215&&II216", block: ""}
		};				
		
		var idBefore = "II\\.2\\.1\\.2";		
		
		var nr = radioDivs(idBefore, divs); 
		$("#radioDiv_" + nr + "_" + idBefore).attr("checked", true);
		$("#radioDiv_" + nr + "_" + idBefore).change();
		
		//II.3) Durata contractului sau termenul de finalizare
		divs = {
			"FIRST":{id: "II.3", master: "", required: "", requiredif: "II33?II34", unblock: "II33?II34", block: "II31?II32&&II33&&II34****II32?II31&&II33&&II34****II33?II31&&II32"},
		};				
		
		idBefore = "";		
		
		nr = radioDivs(idBefore, divs); 				
		
		//IV.2.4) Limba sau limbile în care pot fi redactate proiectele sau cererile de participare
		divs = {
			"FIRST":{id: "IV.2.4", master: "", required: "", requiredif: "", unblock: "", block: "IV241?IV242****IV242?IV241"},
		};				
		
		idBefore = "";		
		
		nr = radioDivs(idBefore, divs); 	
		
		//VI.1) Informatii despre fondurile Uniunii Europene		
		divs = {			
			"FIRST": {id: "VI.1", master: "", required: "", requiredif: "VI11:'F11#VI111#RELATES_TO_EU_PROJECT_YES'?VI12", unblock: "VI11?VI12", block: ""}
		};
		
		idBefore = "";
		
		nr = radioDivs(idBefore, divs); 
		$("#VI11").change();	//just force the V161 to block the V162
		//--------------------------------------------------------------
		
		//----------------------------sectiunea VI----------------------
		//A.I) Alte informatii suplimentare
		var divs = {
			"FIRST": {id: "A.I", master: "AI1", required: "", requiredif: "AI1?AI1", unblock: "AI1?AI2&&AI3&&AI4&&AI5&&AI6&&AI7&&AI8&&AI9&&AI10&&AI11&&AI12", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.I", "AI1");	
		
		//A.II) Alte informatii suplimentare
		var divs = {
			"FIRST": {id: "A.II", master: "AII1", required: "", requiredif: "AII1?AII1", unblock: "AII1?AII2&&AII3&&AII4&&AII5&&AII6&&AII7&&AII8&&AII9&&AII10&&AII11&&AII12", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.II", "AII1");	
		
		//A.III) Alte informatii suplimentare
		var divs = {
			"FIRST": {id: "A.III", master: "AIII1", required: "", requiredif: "AIII1?AIII1", unblock: "AIII1?AIII2&&AIII3&&AIII4&&AIII5&&AIII6&&AIII7&&AIII8&&AIII9&&AIII10&&AIII11&&AIII12", block: ""}
		};
		idBefore = "";
		
		var nr1 = radioDivs(idBefore, divs);
		disableFieldsInDiv("A\\.III", "AIII1");	
		//--------------------------------------------------------------
		
		$( ".radio" ).buttonset();	
	});