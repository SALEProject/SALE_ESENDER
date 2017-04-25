/**********************************************************************************
					FORM VALIDATOR
					
Author: Alexandru Traistaru (at-soft.ro)
Date: 11/21/2012	
Version: 1.0
License: GPL v.2
				
	Copyright (C) 2012 Alexandru Traistaru . All rights reserved.
    You can freely use this script in your Web pages.
    You may adapt this script for your own needs, provided these opening credit
    lines are kept intact.
***********************************************************************************/
	
	
	
	var	url ={
					EN : ['URL is not corect'] ,
					RO : ['Adresa de internet introdusa nu este corecta']
	};
	var	nan ={
					EN : ['This field must contain numbers'] ,
					RO : ['Acest trebuie sa contina numere']
	};
	var	email ={
					EN : ['EMAIL address must be like xxx@x.com'] ,
					RO : ['Adresa de EMAIL trebuie sa fie de forma xxx@x.com']
	};
	var	_2car ={
					EN : ['This input must contain maxim 2 numbers'] ,
					RO : ['Acest camp trebuie sa contina maxim 2 numere']
	};
	var	_3car ={
					EN : ['This input must contain maxim 3 numbers'] ,
					RO : ['Acest camp trebuie sa contina maxim 3 numere']
	};
	var	_4car ={
					EN : ['This input must contain maxim 4 numbers'] ,
					RO : ['Acest camp trebuie sa contina maxim 4 numere']
	};
	var	cost ={
					EN : ['This input value must be like 123456789.12'] ,
					RO : ['Valoarea acestui campt trebuie sa fie de forma 123465789.12']
	};
	var	pcrt ={
					EN : ['This input value must be like xx:xx'] ,
					RO : ['Valoarea acestui campt trebuie sa fie de forma xx:xx']
	};
	var	phone ={
					EN : ['This input value must be like +aa 12346578'] ,
					RO : ['Valoarea acestui campt trebuie sa fie de forma +aa 12346578']
	};
	var	fax ={
					EN : ['This input value must be like +aa 12346578'] ,
					RO : ['Valoarea acestui campt trebuie sa fie de forma +aa 12346578']
	};
	
	
	
	// var formLang = $("#langForm").val();
	var formLang = '';
	
	
	
$(document).ready(function(){
	$(document).tooltip();
	formLang = $("#langForm").val();
	// alert(formLang);
	// $(document).on('blur',':input',function(event){
	$(document).on('focusout',':input',function(event){
	// alert('MERGE');
	
		var elemId = $(this).attr('id');
		var elemType = $(this).attr('class');
		// var elemValue = $(this).val();
		if(elemType.search("error") > 0)
		{
			elemType = elemType.replace("error",'');
			elemType = elemType.replace(" ",'');
			
		}
		
	// alert(elemType);
		switch(elemType)
		{
			/*case "URL"		:  validateInputURL(elemId);
								break;
			case "E-MAIL"	: validateInputEmail(elemId);
								break;
			case "2CAR"		: validateInput2CAR(elemId);
								break;
			case "3CAR"		: validateInput3CAR(elemId);
								break;
			case "4CAR"		: validateInput4CAR(elemId);
								break;
			case "COST"		: validateInputCost(elemId);
								break;
			case "NOTICE_NO"	: validateInputNoticeNo(elemId);
								break;
			case "DATE"	: validateInputDate(elemId);
								break;
			case "TIME"	: validateInputTime(elemId);
								break;
			case "PCRT"	: validateInputPCRT(elemId);
								break;
			case "SIMAP_REF"	: validateInputSimapRef(elemId);
								break;
			case "PHONE"	: validateInputPhone(elemId);
								break;
			case "FAX"	: validateInputFax(elemId);
								break;
			*/					
								
			// default			:  alert("Error getting element type for element: "+elemId);
		
		}
	
	});

});

// input URL
function validateInputURL(elemId)
{
	// var formLang = $("#langForm").val();
	// alert('validateInputUrl: ');
	
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
	// var pattern = new RegExp(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		if(!valid)
		{	
			elemObj.addClass("error");
			elemObj.attr('title',url[formLang]);
			elemObj.trigger("focus");
			
		}
		else
		{
			elemObj.removeClass("error");
			elemObj.attr('title','');
		}
	}
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
	
}

//input E-MAIL
function validateInputEmail(elemId)
{
	// var formLang = $("#langForm").val();
	// alert(formLang);
	
	//alert('validateInputEmail: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	// alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		if(!valid)
		{	
			// alert('ddd');
			// alert(email[formLang]);
			
			elemObj.addClass("error");
			elemObj.attr('title',email[formLang]);
			elemObj.trigger("focus");
			
		}
		else
		{
			elemObj.removeClass("error");
			elemObj.attr('title','');
		}
	}
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
}

//input 2CAR
function validateInput2CAR(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	// var pattern = new RegExp(/^\d{1,2}$/i);
	var pattern = new RegExp(/^\d{1,2}$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	
	if(elemValue.length > 0)
	{
		
		if(isNaN(elemValue))
		{
			elemObj.addClass("error");
			elemObj.attr('title',nan[formLang]);
			elemObj.trigger("focus");
		}
		else
		{
			
			elemObj.removeClass("error");
			elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',_2car[formLang]);
				elemObj.trigger("focus");
				// elemObj.trigger('focusin');
				// setTimeout(elemObj.focus(), 10);
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		}
		
	}
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}	
}
//input 3CAR
function validateInput3CAR(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	// var pattern = new RegExp(/^\d{1,3}$/i);
	var pattern = new RegExp(/^\d{1,3}$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		if(isNaN(elemValue))
		{
			elemObj.addClass("error");
			elemObj.attr('title',nan[formLang]);
			elemObj.trigger("focus");
		}
		else
		{
			
			elemObj.removeClass("error");
			elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',_3car[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		}
		
	}
	else
		{
			// alert('else remove');
			elemObj.removeClass("error");
			elemObj.attr('title','');
		}	
}
//input 4CAR
function validateInput4CAR(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	// var pattern = new RegExp(/^\d{1,4}$/i);
	var pattern = new RegExp(/^\d{1,4}$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		if(isNaN(elemValue))
		{
			elemObj.addClass("error");
			elemObj.attr('title',nan[formLang]);
			elemObj.trigger("focus");
		}
		else
		{
			
			elemObj.removeClass("error");
			elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',_4car[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		}
		
	}	
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
}

//input COST
function validateInputCost(elemId)
{
	// var formLang = $("#langForm").val();
	// alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/^(\d{1,9}|(\d{1,9}(\.\d{0,2}?)))$/i);
	// alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		if(isNaN(elemValue))
		{
			// alert(nan[formLang]);
			elemObj.addClass("error");
			elemObj.attr('title',nan[formLang]);
			elemObj.trigger("focus");
		}
		else
		{
			
			elemObj.removeClass("error");
			elemObj.attr('title','');
			
			if(!valid)
			{	
				// alert(cost[formLang]);
				elemObj.addClass("error");
				elemObj.attr('title',cost[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
				// split cost in 3car groups ex: initial c = 1234 after c = 1 234
				
				// alert(elemValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
				var newElemValue = elemValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
				elemObj.val(newElemValue);
			}
		}
		
	}	
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
}
//input NOTICE no
function validateInputNoticeNo(elemId)
{

}

//input Date
function validateInputDate(elemId)
{

}

//input TIME
function validateInputTime(elemId)
{
	//alert('validateInputTel: '+elemId);
	// var elemObj = $("#"+elemId);
	// var elemValue = elemObj.val();
	// var pattern = new RegExp(/^([0-9]?[0-9](\:[0-9][0-9]))$/i);
	//alert(pattern.test(elemValue));   
	// var valid =  pattern.test(elemValue);
	// if(elemValue.length > 0)
	// {
		// if(!valid)
		// {	
			// elemObj.addClass("error");
			// elemObj.attr('title','Timpul trebuie sa fie de forma xx:xx!');
			// elemObj.trigger("focus");
			
		// }
		// else
		// {
			// elemObj.removeClass("error");
			// elemObj.attr('title','');
		// }
	// }	
}
//input TIME
function validateInputPCRT(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/^(\d{1,2}(\.\d{1,2}))$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		if(isNaN(elemValue))
		{
			elemObj.addClass("error");
			elemObj.attr('title',nan[formLang]);
			elemObj.trigger("focus");
		}
		else
		{
			
			elemObj.removeClass("error");
			elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',pcrt[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		}
		
	}	
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}	
}

// input SIMAP_ref
function validateInputSimapRef(elemId)
{

}

//input PHONE
function validateInputPhone(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/^[\+][0-9]{2}?\s[ ]?[0-9]{8}$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		// if(isNaN(elemValue))
		// {
			// elemObj.addClass("error");
			// elemObj.attr('title',nan[formLang]);
			// elemObj.trigger("focus");
		// }
		// else
		// {
			
			// elemObj.removeClass("error");
			// elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',phone[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		// }
		
	}	
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
}

//input FAX
function validateInputFax(elemId)
{
	// var formLang = $("#langForm").val();
	//alert('validateInputTel: '+elemId);
	var elemObj = $("#"+elemId);
	var elemValue = elemObj.val();
	var pattern = new RegExp(/^[\+][0-9]{2}?\s[ ]?[0-9]{8}$/i);
	//alert(pattern.test(elemValue));   
	var valid =  pattern.test(elemValue);
	if(elemValue.length > 0)
	{
		
		// if(isNaN(elemValue))
		// {
			// elemObj.addClass("error");
			// elemObj.attr('title',nan[formLang]);
			// elemObj.trigger("focus");
		// }
		// else
		// {
			
			// elemObj.removeClass("error");
			// elemObj.attr('title','');
			
			if(!valid)
			{	
				elemObj.addClass("error");
				elemObj.attr('title',fax[formLang]);
				elemObj.trigger("focus");
				
			}
			else
			{
				elemObj.removeClass("error");
				elemObj.attr('title','');
			}
		// }
		
	}	
	else
	{
		// alert('else remove');
		elemObj.removeClass("error");
		elemObj.attr('title','');
	}
}

//------------------------added by Alex P. on 20130425--------------------------------------------------
		function displayErrorHints(){
            var tabsWithErrors = new Array();
			var roman = new Array("I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X");
			
            /*$(".error").each(function(){
				if(!$(this).hasClass("notafield")){	//after the errors are checked, the paragraph containing the hints is created but this paragraph has also "error" class
					var id = $(this).attr("id");
					id = id.replace(/[0-9]/g, '');
					var exists = false;
					for(var i = 0; i < tabsWithErrors.length; i++){
						if(tabsWithErrors[i] == id){
							exists = true;
							break;
						}
					}

					if(!exists)
						tabsWithErrors[tabsWithErrors.length] = id;
				}
            });*/
			
			$(".error").each(function(){
				if(!$(this).hasClass("notafield")){	//after the errors are checked, the paragraph containing the hints is created but this paragraph has also "error" class
					var parentID = $(this).closest("div.ui-tabs-panel").attr("id");										
					parentID = parentID.split("-");
					parentID = parentID[1];
					var id = "";
					
					for(var i = 0; i < roman.length; i++){
						if(i == parentID){
							id = roman[i-1];
						}
					}
					var exists = false;
					for(var i = 0; i < tabsWithErrors.length; i++){
						if(tabsWithErrors[i] == id){
							exists = true;
							break;
						}
					}

					if(!exists)
						tabsWithErrors[tabsWithErrors.length] = id;
				}
            });

            var html = (formLang == "RO")?"<p class='error notafield' id='errorParagraph' align='center'>Va rugam verificati eroarea/erorile din sectiunea/sectiunile: ":"<p class='error notafield' id='errorParagraph' align='center'>Please correct the error/errors from section/sections: ";
            for(var i = 0; i < tabsWithErrors.length; i++){
                var j = i;
                html = html + tabsWithErrors[i] + ", ";
            }
            html = html.substring(0, html.length - 2)
            html = html + "</p>";
			
			$("#errorParagraph").remove();
            $("#frm").before(html);
        } 
		
		function showHideRequired(idSelect, idOption, idRequired){
			$("#" + idSelect).change(function(){									
				var val = $(this).val();						
				if(val == idOption){
					$("#" + idRequired).addClass("required");					
				}	
				else{
					$("#" + idRequired).removeClass("required");
					$("#" + idRequired).removeClass("error");
				}	
			});
		}
		
		function verifyRequiredFields(){
			var allCompleted = true;
			
			$(".required").each(function(){
				var elemType = $(this).prop("tagName");
				var id = $(this).attr("id");
				
				switch(elemType){
					case "SELECT": 	if(!$("#" + id + " option:selected").val().length){
										allCompleted = false; 
										createTooltip(id);
										//return allCompleted; 
									}else{
										removeTooltip(id);
									}									
									
									break;
									
					default: 		if($(this).val() == ""){
										allCompleted = false; 
										createTooltip(id);
										//return allCompleted;
									}else{
										removeTooltip(id);
									}									
									
									break;
				}				
			});
			return allCompleted;
		}

		function createTooltip(id){
			$("#" + id).addClass("error");			
			$("#" + id).attr('title','Va rugam completati acest camp!');
			//$("#" + id).trigger("focus");
		}
		function createTooltipText(id,text){
			$("#" + id).addClass("error");			
			$("#" + id).attr('title',text);
			//$("#" + id).trigger("focus");
		}
		
		function removeTooltip(id){
			$("#" + id).removeClass("error");			
		}
		
		function handleMultiCaseSelect(multiCaseSelect, selectedOption){
			for(var i in multiCaseSelect){				
				if(selectedOption == multiCaseSelect[i].selectValue){
					//clear all fields					
					for(var j in multiCaseSelect){		
						if(multiCaseSelect[j].isEmpty == "true")
							break;
						var id = multiCaseSelect[j].shDiv;	
						if(id.indexOf("&&")>= 0){
							var parts = id.split("&&");
							for (var k = 0; k < parts.length; k++){
								var elem = document.getElementById(parts[k]);
								clearChildren(elem);					
								$("#" + parts[k]).removeClass("required");
							}
						}else{
							var elem = document.getElementById(id);
							clearChildren(elem);	
							$("#" + id).removeClass("required");
						}
					}
					
					//hide all divs
					for(var j in multiCaseSelect){
						if(multiCaseSelect[j].isEmpty == "true")
							break;
						var id = multiCaseSelect[j].shDiv;						
						if(id.indexOf("&&")>= 0){
							var parts = id.split("&&");
							for (var k = 0; k < parts.length; k++){								
								$("#" + parts[k].replace(/\./g, '\\.')).hide();
							}
						}else{							
							$("#" + id.replace(/\./g, '\\.')).hide();
						}
					}									
					
					if(multiCaseSelect[i].isEmpty == "true")
						break;
					
					//show selected div					
					var id = multiCaseSelect[i].shDiv;					
					if(id.indexOf("&&")>= 0){
						var parts = id.split("&&");
						for (var k = 0; k < parts.length; k++){								
							//$("#" + id).show();
							
							var divID = parts[k].replace(/\./g, '\\.');
							$("#" + divID).show();
						}
					}else{													
						id = id.replace(/\./g, '\\.');						
						$("#" + id).show();
					}	
					
					var required = multiCaseSelect[i].required;
					if(required.indexOf("&&")>= 0){
						var parts = required.split("&&");
						for (var k = 0; k < parts.length; k++){																													
							$("#" + parts[k]).addClass("required");
						}
					}else{									
						$("#" + required).addClass("required");
					}
				}
			}
		}
		
		function disableFieldsInDiv(divID, masterFieldID){
			if(masterFieldID == "")	//used for divs with OR fields, when all fields must be available at first for completion.
				return;
			//$("#" + divID).find("input, select, text").attr("disabled", true);			
			$("#" + divID).find("input, select, text, textarea").each(function(){
				var elemID = $(this).attr("id");
				if(elemID!= masterFieldID)
					$(this).attr("disabled", true);
			});			
		}
		
		function radioDivs(idBefore, divs){
			
			if(idBefore.length > 0){
				//------------------1. working with visibility------------------------------------------------------------------------------------------------------------
				var html = "<div class='radio' align='center'>";
				//---------get existing radioDivs-------------------------
				var radioNameNr = 1;
				try{				
					$('input[name*="radioDiv"]').each(function(){					
						var parts = $(this).attr("name");					
						parts = parts.split("_");					
						var nr = parts[1];
						nr++;
						radioNameNr = nr;
					});
				}catch(err){
					radioNameNr = 1;
				}
				//---------create radioDiv-------------------------------
				var counter = 0;
				for(var i in divs){
					//var divName = $("#" + divs[i].id + " div:first-child pre:first-child").text();
					var divName = $("#" + divs[i].id.replace(/\./g, '\\.') + " div:first-child").first("per:first-child").text();
					var parts = divName.split(/[0-9][)]/);
					divName = parts[1];
					/*parts = divName.split(" ");
					if( Object.prototype.toString.call( parts ) === '[object Array]' ) {					
						divName = "";
						if(parts.length >= 3)
							for(var j = 0; j < parts.length; j++){
								divName+= parts[j] + " ";
								if(j%3 == 0)
									divName+="<br/>";
							}
					}*/
					var radioID = "radioDiv_" + radioNameNr + "_" + divs[i].id;
					//html+= "<input type='radio' name='radioDiv_" + radioNameNr + "' id='" + radioID + "' value='" + i + "' ><label for='" + radioID + "'>" + ++counter + ") " + divName + "</label>";
					html+= "<input type='radio' name='radioDiv_" + radioNameNr + "' id='" + radioID + "' value='" + i + "' ><label for='" + radioID + "'>" + ++counter + ") " + "</label>";
				}
				html+= "</div>";
				
				$("#" + idBefore).before(html);
				//--------append on change-------------------------------
				$("input[name='radioDiv_" + radioNameNr + "']").change(function(){
					for(var i in divs){
						var id = divs[i].id;					
						var elem = document.getElementById(id);
						clearChildren(elem);										
						id = id.replace(/\./g, '\\.');
						$("#" + id).hide();
						disableFieldsInDiv(id, divs[i].master);	//disable all fields in div without the master field
						removeClassInDiv(id, "required");
						removeClassInDiv(id, "error");					
					}
					
					var id = $(this).attr("id");
					var parts = id.split("_");
					id = parts[2];
					id = id.replace(/\./g, '\\.');
					$("#" + id).show();
				});
				//--------------------------------------------------------------------------------------------------------------------------------------------------------
				 $( "input radio" ).buttonset();
			}
			
			//------------------2. working with required fields-------------------------------------------------------------------------------------------------------
			//------------------add required class to required fields-------------------------------------------------------------------------------------------------
			for(var i in divs){
				var requiredFields = divs[i].required;
				if(requiredFields.length > 0){
					var parts = requiredFields.split("&&");
					for(var i = 0; i < parts.length; i++){
						$("#" + parts[i]).addClass("required");
					}
				}
			}											
			
			for(var i in divs){
				var requiredIfFields = divs[i].requiredif;
				if(requiredIfFields.length > 0){
					var cases = requiredIfFields.split("****");
					for(var j = 0; j < cases.length; j++){
						var cond = cases[j];						
						var hasQuestion = (cond.indexOf("?")!== -1) ? true : false;						
						var hasColon = (cond.indexOf(":")!== -1) ? true : false;						
						var colonParts;
						var questionParts;											
							
						if(hasColon){						
							colonParts = cond.split(":");
							var selectID = colonParts[0];												
							colonParts = colonParts[1].split("?");
							var fieldID = colonParts[1];
							colonParts = colonParts[0].split("=");
							var identificator = colonParts[0];
							var identificatorValue = colonParts[1];
							identificatorValue = identificatorValue.replace(/\'/g, '');		
							
							//blocked fields
							var unblockedFields = divs[i].unblock;
							if(unblockedFields.length > 0){
								var bf = unblockedFields.split("****");					
								unblockedFields = new Array();
								for(var k = 0; k < bf.length; k++ ){
									var str = bf[k].split("?");
									var master = str[0];
									if(master == selectID){	
										if(str[1].indexOf("&&")!== -1)	
											unblockedFields = str[1].split("&&");
										else
											unblockedFields = str[1];
									}
								}
							}
							
							radioDivAppendOnChange(selectID, identificatorValue, fieldID, unblockedFields);
							
						}else if(hasQuestion){							
							var questionParts = cond.split("?");
							var fieldIf = questionParts[0];
							var fieldThen = questionParts[1];
							var parts = new Array();
							if(fieldThen.indexOf("&&")!== -1)
								parts = fieldThen.split("&&");													
							else
								parts = fieldThen;		
								
							//unblock fields
							var unblockedFields = divs[i].unblock;
							if(unblockedFields.length > 0){
								var bf = unblockedFields.split("****");							
								unblockedFields = new Array();
								for(var k = 0; k < bf.length; k++ ){
									var str = bf[k].split("?");
									var master = str[0];
									if(master == fieldIf){
										if(str[1].indexOf("&&")!== -1)
											unblockedFields = str[1].split("&&");
										else
											unblockedFields = str[1];	
									}
								}
							}										
							
							radioDivAppendKeyUp(fieldIf, parts, unblockedFields);
						}
					}	
				}	
				
				//block fields
				var blockFields = divs[i].block;				
				if(blockFields.length > 0){				
					var cases = blockFields.split("****");					
					if( Object.prototype.toString.call( cases ) === '[object Array]' ){ 
						for(var j = 0; j < cases.length; j++){
							var str = cases[j];
							var parts = str.split("?");
							var parent = parts[0];						
							parts = parts[1].split("&&");						
							appendOrField(parent, parts);						
						}
					}else{
						var parts = cases.split("?");
						var parent = parts[0];						
						parts = parts[1].split("&&");						
						appendOrField(parent, parts);						
					}
				}
			}
			
			function appendOrField(parent, fields){
				//$("#" + parent).keyup(function(){
				$("#" + parent).on("keyup change", function(){
					var text = $(this).val();
					if(text.length > 0){
						if( Object.prototype.toString.call( fields ) === '[object Array]' ) {
							for(var i = 0; i < fields.length; i++){
								clearElementValue(fields[i]);
								$("#" + fields[i]).removeClass("required");
								$("#" + fields[i]).removeClass("error");
								$("#" + fields[i]).attr("disabled", true);								
							}
						}else{
							clearElementValue(fields[i]);
							$("#" + fields).removeClass("required");
							$("#" + fields).removeClass("error");
							$("#" + fields).attr("disabled", true);
						}
					}else{
						if( Object.prototype.toString.call( fields ) === '[object Array]' ) {
							for(var i = 0; i < fields.length; i++){								
								removeAttribute(fields[i], "disabled");
							}
						}else{
							removeAttribute(fields, "disabled");
						}
						$("#" + parent).removeClass("required");
					}						
				});
			}
			
			function clearElementValue(elemID){
				e = document.getElementById(elemID);
				if (e.tagName) 
					switch (e.tagName.toLowerCase()) { 
						case 'input': 
							switch (e.type) { 
							   case "radio": 
							   case "checkbox": e.checked = false; break; 
							   case "button": 
							   case "submit": 
							   case "image": break; 
							   default: e.value = ''; break; 
							} 
						break; 
						case 'select': e.selectedIndex = 0; break; 
						case 'textarea': e.value = ''; break; 
					} 
			}
			
			function removeAttribute(id, attr){
				$("#" + id).removeAttr(attr);
			}
			
			function radioDivAppendKeyUp(fieldIf, fields, unblockedFields){		
				//$("#" + fieldIf).keyup(function(){					
				$("#" + fieldIf).on("keyup change", function(){								
					var text = $(this).val();					
					if(text.length > 0){	
						if( Object.prototype.toString.call( fields ) === '[object Array]' ) {
							for(var k = 0; k < fields.length; k++){																				
								$("#" + fields[k]).addClass("required");										
							}
						}else{
							$("#" + fields).addClass("required");										
						}
						
						if(unblockedFields.length > 0)
							if( Object.prototype.toString.call( unblockedFields ) === '[object Array]' ) {
								for(var k = 0; k < unblockedFields.length; k++){
									$("#" + unblockedFields[k]).removeAttr("disabled");
								}
							}else{								
								$("#" + unblockedFields).removeAttr("disabled");	
							}							
					}else{						
						if( Object.prototype.toString.call( fields ) === '[object Array]' ) {
							for(var k = 0; k < fields.length; k++){								
								$("#" + fields[k]).removeClass("required");	
								$("#" + fields[k]).removeClass("error");	
								var type = $("#" + fields[k]).prop("tagName");
								if(type.toUpperCase() == "SELECT"){
									$("#" + fields[k]).val($("#" + fields[k] + " option:first").val());									
									//$("#" + fields[k] + " option:first").attr("selected", "selected");																								
									$("#" + fields[k]).change();		
								}else{
									$("#" + fields[k]).val("");
								}
							}										
						}else{							
							$("#" + fields).removeClass("required");	
							$("#" + fields).removeClass("error");	
							var type = $("#" + fields).prop("tagName");
							if(type.toUpperCase() == "SELECT"){
								$("#" + fields).val($("#" + fields + " option:first").val());																				
								$("#" + fields).change();		
							}else{
								$("#" + fields).val("");
							}
						}
						
						
						if(unblockedFields.length > 0)
							if( Object.prototype.toString.call( unblockedFields ) === '[object Array]' ) {
								for(var k = 0; k < unblockedFields.length; k++){									
									$("#" + unblockedFields[k]).attr("disabled", true);
									var type = $("#" + unblockedFields[k]).prop("tagName");
									if(type.toUpperCase() == "SELECT"){
										$("#" + unblockedFields[k]).val($("#" + unblockedFields[k] + " option:first").val());									
										//$("#" + fields[k] + " option:first").attr("selected", "selected");																								
										$("#" + unblockedFields[k]).change();		
									}else{
										$("#" + unblockedFields[k]).val("");
									}
								}
							}else{								
								$("#" + unblockedFields).attr("disabled", true);
								var type = $("#" + unblockedFields).prop("tagName");
								if(type.toUpperCase() == "SELECT"){
								$("#" + unblockedFields).val($("#" + unblockedFields + " option:first").val());																				
								$("#" + unblockedFields).change();		
								}else{
									$("#" + unblockedFields).val("");
								}
							}							
					}
				});
			}
			
			function radioDivAppendOnChange(selectID, identificatorValue, fieldID, unblockedFields){		
				$("#" + selectID).change(function(){	
					var selectedID = $(this).children(":selected").attr("id");								
					if(selectedID == identificatorValue){
						$("#" + fieldID).addClass("required");						
						if(unblockedFields.length > 0)
							if( Object.prototype.toString.call( unblockedFields ) === '[object Array]' ) {
								for(var k = 0; k < unblockedFields.length; k++){
									$("#" + unblockedFields[k]).removeAttr("disabled");
								}
							}else{								
								$("#" + unblockedFields).removeAttr("disabled");	
							}	
					}else{
						$("#" + fieldID).removeClass("required");
						$("#" + fieldID).removeClass("error");
						if(unblockedFields.length > 0)
							if( Object.prototype.toString.call( unblockedFields ) === '[object Array]' ) {
								for(var k = 0; k < unblockedFields.length; k++){
									$("#" + unblockedFields[k]).attr("disabled", true);
									var type = $("#" + unblockedFields[k]).prop("tagName");
									if(type.toUpperCase() == "SELECT"){
									$("#" + unblockedFields[k]).val($("#" + unblockedFields[k] + " option:first").val());																				
									$("#" + unblockedFields[k]).change();		
									}else{
										$("#" + unblockedFields[k]).val("");
									}
								}
							}else{																
								$("#" + unblockedFields).attr("disabled", true);
								var type = $("#" + unblockedFields).prop("tagName");
								if(type.toUpperCase() == "SELECT"){
								$("#" + unblockedFields).val($("#" + unblockedFields + " option:first").val());																				
								$("#" + unblockedFields).change();		
								}else{
									$("#" + unblockedFields).val("");
								}
							}
					}								
				});
			}
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			
			return radioNameNr;	
		}
		
		
		function removeClassInDiv(divID, className){	
			$("#" + divID).find("input, select, text").removeClass(className);
		}		
		
		function showTabSingleSelector(selectID, selectOption, tabNumber, divs){
			$("#" + selectID).change(function(){			
				var selectedOption = $("option:selected", this).attr("id");
				var showDiv = false;
				for(var j = 0; j < selectOption.length; j++){															
					if(selectedOption == selectOption[j]){	//show tab
						showDiv = true;
						$("#tabs").tabs("enable", tabNumber);
						//for(var i = 0; i < divs.length; i++){
							var divID = divs[j];
							divID = divID.replace(/\./g, '\\.');
							$("#" + divID).show();
						//}
						
					}else{
						if(!showDiv)
							$("#tabs").tabs("disable", tabNumber);
						//for(var i = 0; i < divs.length; i++){
							var divID = divs[j];							
							clearChildren(document.getElementById(divID));
							divID = divID.replace(/\./g, '\\.')
							$("#" + divID).hide();
						//}
					}
				}	
			});
		}
		
		function showTabMultiSelectors(selectors, tabNumber){	//this function controls different divs in specific tab, based on the selections made by user on different selectors.
			for(var i in selectors){
				var idSelect = selectors[i].idSelect;			
				var option = selectors[i].option;
				var idTargetDiv = selectors[i].idTargetDiv;										
				
				appendMultiSelectors(idSelect, option, idTargetDiv, selectors, tabNumber);			
			}
		}
	
	function appendMultiSelectors(idSelect, option, idTargetDiv, selectors, tabNumber){				
		$("#" + idSelect).data("idSelect", idSelect);
		$("#" + idSelect).data("option", option);		
		$("#" + idSelect).data("idTargetDiv", idTargetDiv);
		$("#" + idSelect).data("selectors", selectors);
		$("#" + idSelect).data("tabNumber", tabNumber);
		
		$("#" + idSelect).change(function(){		
				//var sel = selectors;				
				var idSelect = $(this).data("idSelect");
				var option = $(this).data("option");
				var idTargetDiv = $(this).data("idTargetDiv");
				var selectors = $(this).data("selectors");
				var tabNumber = $(this).data("tabNumber");					
				var parts = option.split("=");
				var identificator = parts[0];				
				option = parts[1];								
				if(identificator == "text"){
					var text = $(this).val();
					if(text!= ""){
						$("#tabs").tabs("enable", tabNumber);
						var targetID = idTargetDiv;
						targetID = targetID.replace(/\./g, '\\.');
						$("#" + targetID).show();
					}else{
						var targetID = idTargetDiv;					
						clearChildren(document.getElementById(targetID));					
						targetID = targetID.replace(/\./g, '\\.');
						$("#" + targetID).hide();					
						removeClassInDiv(targetID, "required");
						removeClassInDiv(targetID, "error");	
						
						var count = 0;
						var varValues = new Array();
						for(var j in selectors){
							var divID = selectors[j].idTargetDiv;
							divID = divID.replace(/\./g, '\\.');
							
							var visible = ($("#" + divID).css("display") == "none") ? false : true;
							varValues[count] = visible;	
							count++;
						}
						
						var existsDivVisible = false;					
						for(var j = 0; j < varValues.length; j++){						
							//alert(varValues[j]);
							if(varValues[j])
								existsDivVisible = true;
						}
						
						if(!existsDivVisible){
							$("#tabs").tabs("disable", tabNumber);						
						}else{
							
						}					
					}
				}else{
					var selectedOption = $("option:selected", this).attr(identificator);
					if(selectedOption == option){					
						$("#tabs").tabs("enable", tabNumber);
						var targetID = idTargetDiv;
						targetID = targetID.replace(/\./g, '\\.');
						$("#" + targetID).show();
					}else{										
						var targetID = idTargetDiv;					
						clearChildren(document.getElementById(targetID));					
						targetID = targetID.replace(/\./g, '\\.');
						$("#" + targetID).hide();					
						removeClassInDiv(targetID, "required");
						removeClassInDiv(targetID, "error");	
						
						var count = 0;
						var varValues = new Array();
						for(var j in selectors){
							var divID = selectors[j].idTargetDiv;
							divID = divID.replace(/\./g, '\\.');
							
							var visible = ($("#" + divID).css("display") == "none") ? false : true;
							varValues[count] = visible;	
							count++;
						}
						
						var existsDivVisible = false;					
						for(var j = 0; j < varValues.length; j++){						
							//alert(varValues[j]);
							if(varValues[j])
								existsDivVisible = true;
						}
						
						if(!existsDivVisible){
							$("#tabs").tabs("disable", tabNumber);						
						}else{
							
						}					
					}
				}	
			});
	}
	
	function dependentRequiredField(parentID, childID, identificator, option){						
		$("#" + parentID).change(function(){
			var selectedOption = $("option:selected", this).attr(identificator);
		
			if(selectedOption == option)
				$("#" + childID).addClass("required");
			else{
				$("#" + childID).removeClass("required");
				$("#" + childID).removeClass("error");
				$("#" + childID).val("");
			}
		});
	}
//--------------------------------------------------------------------------------------------------------------------




//    Added by ALEX T.
/*
	1. For every input type = hidden or display : none   checks children
	2. if a children is required then create an array with parent id and children id -> add children id to array and 
	then remove required from children
	
	3. when parent is shown then required attr is set to children

*/
/*
var testArray = new Array();


$(document).ready(function(){

	var i = 0;


	$.each($("div:hidden"),function(){
		i++;
		var	nans ={
					EN : ['This field must contain numbers'] ,
					RO : ['Acest trebuie sa contina numere']
		};
		
		if(i == 1)
		{
			testArray.push(nans);
		}
		
		
	});
	
	for(var x in testArray[0])
	{
		alert(testArray[0][x]);
	}
	
	
});

*/