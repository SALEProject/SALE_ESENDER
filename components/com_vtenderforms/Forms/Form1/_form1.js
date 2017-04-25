$(document).ready(function(){
	
	
	
	$("#frm").submit(function(e){
	var ok = true;
	var ret = true;
	
		
	// alert('asdasdas');
		if($('#IIA41').val().length > 0 )
		{
			// alert('1');	
		
			$('#IIA41').removeClass('required');
			if($('#IIA61').val().length > 0)
				{
					$('#IIA61').removeClass('required');
					// alert('2');
					if($('#IIA623').val().length > 0)
					{
						$('#IIA623').removeClass('required');
						// alert('3');
						if($('#IIA624').val().length > 0)
						{
							
							$('#IIA624').removeClass('required');
							// alert('4');
							if($('#VI4').val().length > 0 )
							{
							
								$('#VI4').removeClass('required');
								// alert('5');
								if(
									$.datepicker.parseDate('mm/dd/yy', $('#IIA61').val()) < $.datepicker.parseDate('mm/dd/yy', $('#VI4').val()) ||
									$.datepicker.parseDate('mm/dd/yy', $('#IIA623').val()) < $.datepicker.parseDate('mm/dd/yy', $('#VI4').val()) ||
									$.datepicker.parseDate('mm/dd/yy', $('#IIA624').val()) < $.datepicker.parseDate('mm/dd/yy', $('#VI4').val()) 
									 
								)
								{
									// alert('6');
									$('#IIA41').removeClass('required');
									$('#VI4').removeClass('required');
									$('#IIA61').removeClass('required');
									$('#IIA623').removeClass('required');
									$('#IIA624').removeClass('required');
									
									createTooltipText('VI4','The date must be  lower than  '+$('#IIA61').val()+' and  '+ $('#IIA623').val()+' and '+$('#IIA624').val()+' ');	
									// displayErrorHints();
									ok = false;
								}	
								else
								{
									// alert('7');
									$('#IIA41').removeClass('required');
									$('#VI4').removeClass('required');
									$('#IIA61').removeClass('required');
									$('#IIA623').removeClass('required');
									$('#IIA624').removeClass('required');
									$('#IIA41').removeClass('error');
									$('#VI4').removeClass('error');
									$('#IIA61').removeClass('error');
									$('#IIA623').removeClass('error');
									$('#IIA624').removeClass('error');
									ok = true;
								}								
							}
							else
							{
								$('#VI4').addClass('required');
							}
							
						}
						else
						{
							$('#IIA624').addClass('required');
						}
					
					
						
					}
					else
					{
						$('#IIA623').addClass('required');
					}
					
				}
				else
				{
					$('#IIA61').addClass('required');
				}
			
		}

		if(verifyRequiredFields())
			ret = true;
		else{
			displayErrorHints();
			ret = false;
		}	
		
		if(ok == true && ret == true)
		{
			$(".DATE").val('');
			return true;
		}	
		else
		{		
			e.preventDefault();
			return false;
		}
		
		/*
		$(".DATE").val('');
		
		var errorsSectionI = new Array();	
		var errorsSectionIIA = new Array();	
		var errorsSectionIIB = new Array();	
		var errorsSectionIII = new Array();	
		var errorsSectionIV = new Array();	
		var errorsSectionVI = new Array();	
		var errorsSectionA = new Array();	
		var errorsSectionB = new Array();	
		
		
	//------- check date condition for II.A , II.B and note dispatch date	
		//condition for II.A.6.1 - date
		
		var elemObjA;
		var dayAI;
		var monthAI;
		var yearAI;
		var dateIdsA;
		if($("#IIA61").length > 0)
		{
			elemObjA = $("#IIA61");
			dateIdsA = elemObjA.attr("name").split("#");
			dayAI = $("#"+dateIdsA[0]).val();
			monthAI = $("#"+dateIdsA[1]).val();
			yearAI = $("#"+dateIdsA[2]).val();
		}
		
		
		
		
		//notice dispatch date
		var dateCondIds = $("#VI4").attr("name").split("#");
		var dayF = $("#"+dateCondIds[0]).val();
		var monthF = $("#"+dateCondIds[1]).val();
		var yearF = $("#"+dateCondIds[2]).val();
		
		// if((dayAI < dayF || dayBI < dayF) || (monthAI < monthF || monthBI < monthF) || (yearAI < yearF || yearBI < yearF))
		if((dayAI < dayF) || (monthAI < monthF) || (yearAI < yearF))
		{	
			elemObjA.addClass("errorField");
			// elemObj.attr('title','Must be bigger than date of dispatch notice!');
			// elemObj.trigger("focus");
			errorsSectionI.push("Date must be bigger than notice dispatch date!");
		}
		else
		{
			elemObjA.removeClass("errorField");
			elemObjA.attr('title','');
		}
	
	
		//section III.1 - Main financing condition
		
		if($("#IIA41").length > 0)
		{
			if($("#IIA41").val().length > 0)
			{
				$("#III11").removeAttr('disabled');
			}
			else
			{
				$("#III11").attr('disabled','disabled');
				$("#III11").val('');
				
			}
		}
		
		
		// section VI 
			
			//Relates to EU projects
			if($("#VI11").attr("name").split("#")[2] == "RELATES_TO_EU_PROJECT_YES")
			{
				$("#VI12").removeAttr('disabled');
				if($("#VI12").val() > 0)
				{
					$("#VI12").removeClass("errorField");
					$("#VI12").attr('title','');
				}
				else
				{
					$("#VI12").addClass("errorField");
					// elemObj.attr('title','Must be bigger than date of dispatch notice!');
					// elemObj.trigger("focus");
					errorsSectionVI.push("If contract is related tu EU project you must fill this field!");
				}
			}
			else
			{
				$("#VI12").attr('disabled','disabled');
				$("#VI12").val('');
			}
		/*	
			// note dispatch date
			if($("#VI4").length > 0)
			{
				if($("#IIA41").length > 0)
				{
					if($("#IIA41").val().length > 0)
					{
						var elemObjB1;
						var dayBI1;
						var monthBI1;
						var yearBI1;
						var dateIdsB1;
						var elemObjB2;
						var dayBI2;
						var monthBI2;
						var yearBI2;
						var dateIdsB2;
						
						elemObjB1 = $("#IIA623");
						dateIdsB1 = elemObjB1.attr("name").split("#");
						dayBI1 = $("#"+dateIdsB1[0]).val();
						monthBI1 = $("#"+dateIdsB1[1]).val();
						yearBI1 = $("#"+dateIdsB1[2]).val();
						
						elemObjB2 = $("#IIA624");
						dateIdsB2 = elemObjB2.attr("name").split("#");
						dayBI2 = $("#"+dateIdsB2[0]).val();
						monthBI2 = $("#"+dateIdsB2[1]).val();
						yearBI2 = $("#"+dateIdsB2[2]).val();
						
						if(((dayAI < dayF && dayBI1 < dayF && dayBI2 < dayF) || (monthAI < monthF && monthBI1 < monthF && monthBI2 < monthF) || (yearAI < yearF && yearBI1 < yearF && yearBI2 < yearF)))
						{	
							elemObjB1.addClass("errorField");
							elemObjB2.addClass("errorField");
							// elemObj.attr('title','Must be bigger than date of dispatch notice!');
							// elemObj.trigger("focus");
							errorsSectionIIA.push("Date must be bigger than notice dispatch date!");
						}
						else
						{
							elemObjB1.removeClass("errorField");
							elemObjB1.attr('title','');
							elemObjB2.removeClass("errorField");
							elemObjB2.attr('title','');
						}
						
					}
					else
					{
						if($("#IIB61").length > 0)
						{
							
							elemObjA = $("#IIB61");
							if(elemObjA.attr("name").length > 0)
							{
								
								dateIdsA = elemObjA.attr("name").split("#");
								
								dayAI = $("#"+dateIdsA[0]).val();
								monthAI = $("#"+dateIdsA[1]).val();
								yearAI = $("#"+dateIdsA[2]).val();
								if(dayAI <= 0 )
								{
									dayAI = dayF;
									monthAI = monthF;
									yearAI = yearF;
								}
							}
							else
							{
								dayAI = dayF;
								monthAI = monthF;
								yearAI = yearF;
							}
						}	
						else
						{
							dayAI = dayF;
							monthAI = monthF;
							yearAI = yearF;
						}
						
						if((dayAI < dayF) || (monthAI < monthF) || (yearAI < yearF))
						{	
							alert(dayAI+"-"+dayF+", "+monthAI+"-"+monthF+", "+yearAI+"-"+yearF);
							
							elemObjA.addClass("errorField");
							// elemObj.attr('title','Must be bigger than date of dispatch notice!');
							// elemObj.trigger("focus");
							errorsSectionIIB.push("Date must be bigger than notice dispatch date!");
						}
						else
						{
							elemObjA.removeClass("errorField");
							elemObjA.attr('title','');
						}
						
					}
				}
			
			} 
		
		// prcessing Aditional A
			// A2
			if($("#VI31").val().length > 0)
			{
				$("#A\\.II :input").removeAttr('disabled');
			}
			else
			{
				$("#A\\.II :input").attr('disabled','disabled');
				$("#A\\.II :input").val('');
			}
		// A3
			if($("#VI32").val().length > 0)
			{
				$("#A\\.III :input").removeAttr('disabled');
			}
			else
			{
				$("#A\\.III :input").attr('disabled','disabled');
				$("#A\\.III :input").val('');
			}
		// A4
			if($("#VI33").val().length > 0)
			{
				$("#A\\.IV :input").removeAttr('disabled');
			}
			else
			{
				$("#A\\.IV :input").attr('disabled','disabled');
				$("#A\\.IV :input").val('');
			}
		
		//settings for additional B	
		if($("#IIA47").attr("name").split("#")[2] == "F01_DIV_INTO_LOT_YES" || $("#IIB47").attr("name").split("#")[2] == "F01_DIV_INTO_LOT_YES")
		{
			var itemsError;
			$("#B").children('input').each(function(){
				
				if($(this).val().length < 0)
				{
					itemsError ++;
				}
			
			});
			
			if(itemsError.length > 0)
			{
				$("#B\\.1").addClass("errorField");
				errorsSectionB.push("All required information must be completed!");
			}
			else
			{
				$("#B\\.1").removeClass("errorField");
				$("#B\\.1").attr('title','');
			}
			
		}
		else
		{
			$("#B\\.1").removeClass("errorField");
			$("#B\\.1").attr('title','');
		}
		
		
	
		//--------------------------------------------------
		//------ display errors for for every form section
		//--------------------------------------------------
			if(errorsSectionI.length > 0)
			{
				var afters = $("#I\\.1");
				var html = "<p id='errorsSectionI' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionI.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionI[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionI");
				afters.remove();
				
			}
			if(errorsSectionIIA.length > 0)
			{
				var afters = $("#II\\.A\\.1");
				var html = "<p id='errorsSectionIIA' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionIIA.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionIIA[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionIIA");
				afters.remove();
				
			}
			if(errorsSectionIIB.length > 0)
			{
				var afters = $("#II\\.B\\.1");
				var html = "<p id='errorsSectionIIB' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionIIB.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionIIB[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionIIB");
				afters.remove();
				
			}
			if(errorsSectionIII.length > 0)
			{
				var afters = $("#III\\.1");
				var html = "<p id='errorsSectionIII' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionIII.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionIII[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionIII");
				afters.remove();
				
			}
			if(errorsSectionIV.length > 0)
			{
				var afters = $("#IV\\.1");
				var html = "<p id='errorsSectionIV' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionIV.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionIV[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionIV");
				afters.remove();
				
			}
			if(errorsSectionVI.length > 0)
			{
				var afters = $("#VI\\.1");
				var html = "<p id='errorsSectionVI' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionVI.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionVI[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionVI");
				afters.remove();
				
			}
			if(errorsSectionA.length > 0)
			{
				var afters = $("#A\\.1");
				var html = "<p id='errorsSectionA' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionA.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionA[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionA");
				afters.remove();
				
			}
			if(errorsSectionB.length > 0)
			{
				var afters = $("#B\\.1");
				var html = "<p id='errorsSectionB' class='errors'>Please correct all erros before submiting form!</br>";
				for(i=0;i<errorsSectionB.length;i++)
				{
					html = html + (i+1) +". "+errorsSectionB[i]+"</br>"; 
				}
				html = html +"</p>";
				
				afters.before(html);
			}
			else
			{
				var afters = $("#errorsSectionB");
				afters.remove();
				
			}
	 
		if(errorsSectionI.length > 0 || errorsSectionIIA.length > 0 || errorsSectionIIB.length > 0 || errorsSectionIII.length > 0 || errorsSectionIV.length > 0 
			 || errorsSectionVI.length > 0 || errorsSectionA.length > 0 || errorsSectionB.length > 0 )
		{
			 // alert('ERRORS errorsSectionI '+errorsSectionI.length);
			 // alert('ERRORS errorsSectionIIA '+errorsSectionIIA.length);
			 // alert('ERRORS errorsSectionIIB '+errorsSectionIIB.length);
			 // alert('ERRORS errorsSectionIII '+errorsSectionIII.length);
			 // alert('ERRORS errorsSectionIV '+errorsSectionIV.length);
			 // alert('ERRORS errorsSectionVI '+errorsSectionVI.length);
			 // alert('ERRORS errorsSectionA '+errorsSectionA.length);
			 // alert('ERRORS errorsSectionB '+errorsSectionB.length);
			e.preventDefault();
			return false;
		}
		// else
		// {
			// alert('CORECT INFORMATION');
		// }
	
		
		*/
	});
	
	
	// settings for section I
	$("#I43").addClass('required');
	
	
	// settings for SECTION II.A
	$("#tabs").tabs({disabled: [1,2]});
	// $("#IIA41").removeAttr('required');
	// $("#IIA51").removeAttr('required');
	$("#IIA41").removeClass('required');
	$("#IIA51").removeClass('required');
	
	// $("#IIB211").removeAttr('required');
	$("#IIB211").removeClass('required');
	// $("#IIB41").removeAttr('required');
	$("#IIB41").removeClass('required');
	
	
// temporary settings	
	$('#B232').removeClass('required');
	$('#B231').removeClass('required');
	
	
	
// end temporary settings	
	
	
	$("#I43").change(function(){
		
	 if($(this).val() == 'II.A')
	 {
		$(this).removeClass('required');
		$(this).removeClass('error');
		$("#tabs").tabs('enable',1);
		$("#tabs").tabs({disabled: [2]});	
		// $("#IIA41").attr('required','required');
		// $("#IIA51").attr('required','required');
		$("#IIA41").addClass('required');
		$("#IIA51").addClass('required');
		
		var arrayB1 = new Array('B1',
									'B2',
									'B3',
									'B211',
									'B221',
									'B231',
									'B241',
									'B311',
									'B321',
									'B331',
									'B341',
									'B351',
									'B361',
									'B312',
									'B411',
									'B412',
									'B413',
									'B414',
									'B415',
									'B416',
									'B417',
									'B418',
									'B419',
									'B420',
									'B421',
									'B422',
									'B423',
									'B424',
									'B52'
									);
			var arrayB2 = new Array('B4',
									'B5',
									'B6',
									'B212',
									'B222',
									'B232',
									'B242',
									'B322',
									'B332',
									'B342',
									'B352',
									'B362',
									'B425',
									'B426',
									'B427',
									'B428',
									'B429',
									'B430',
									'B431',
									'B432',
									'B433',
									'B434',
									'B435',
									'B436',
									'B437',
									'B438',
									'B53'
									);
		
			for(var b1 = 0; b1 < arrayB1.length; b1++)		
			{
				$("#"+arrayB1[b1]).removeAttr('disabled');
			}
			for(var b2 = 0; b2 < arrayB2.length; b2++)		
			{
				$("#"+arrayB2[b2]).attr('disabled','disabled');
			}
			// $('#B231').addClass('required');
			// $('#B232').removeClass('required');
		
		
	 }
	 else
	 if($(this).val() == 'II.B')
	 {
		alert('II.b');
		$(this).removeClass('required');
		$(this).removeClass('error');
		$("#tabs").tabs('enable',2);
		$("#tabs").tabs({disabled: [1]});	
		// $("#IIB211").attr('required','required');
		$("#IIB211").addClass('required');
		// $("#IIB41").attr('required','required');
		$("#IIB41").addClass('required');

		var arrayB1 = new Array('B1',
									'B2',
									'B3',
									'B211',
									'B221',
									'B231',
									'B241',
									'B311',
									'B321',
									'B331',
									'B341',
									'B351',
									'B361',
									'B312',
									'B411',
									'B412',
									'B413',
									'B414',
									'B415',
									'B416',
									'B417',
									'B418',
									'B419',
									'B420',
									'B421',
									'B422',
									'B423',
									'B424',
									'B52'
									);
			var arrayB2 = new Array('B4',
									'B5',
									'B6',
									'B212',
									'B222',
									'B232',
									'B242',
									'B322',
									'B332',
									'B342',
									'B352',
									'B362',
									'B425',
									'B426',
									'B427',
									'B428',
									'B429',
									'B430',
									'B431',
									'B432',
									'B433',
									'B434',
									'B435',
									'B436',
									'B437',
									'B438',
									'B53'
									);
		
			for(var b1 = 0; b1 < arrayB1.length; b1++)		
			{
				$("#"+arrayB1[b1]).attr('disabled','disabled');
			}
			for(var b2 = 0; b2 < arrayB2.length; b2++)		
			{
				
				$("#"+arrayB2[b2]).removeAttr('disabled');
			}
			// $('#B232').addClass('required');
			// $('#B231').removeClass('required');
	 }
	 else
	 if($(this).val() == '')
	 {
		
		$(this).addClass('required');
		$("#tabs").tabs({disabled: [1,2]});	
		// $("#IIA41").removeAttr('required');
		// $("#IIA51").removeAttr('required');
		$("#IIA41").removeClass('required');
		$("#IIA51").removeClass('required');
		
		// $("#IIB211").removeAttr('required');
		$("#IIB211").removeClass('required');
		// $("#IIB41").removeAttr('required');
		$("#IIB41").removeClass('required');
		
		var arrayB1 = new Array('B1',
									'B2',
									'B3',
									'B211',
									'B221',
									'B231',
									'B241',
									'B311',
									'B321',
									'B331',
									'B341',
									'B351',
									'B361',
									'B312',
									'B411',
									'B412',
									'B413',
									'B414',
									'B415',
									'B416',
									'B417',
									'B418',
									'B419',
									'B420',
									'B421',
									'B422',
									'B423',
									'B424',
									'B52'
									);
			var arrayB2 = new Array('B4',
									'B5',
									'B6',
									'B212',
									'B222',
									'B232',
									'B242',
									'B322',
									'B332',
									'B342',
									'B352',
									'B362',
									'B425',
									'B426',
									'B427',
									'B428',
									'B429',
									'B430',
									'B431',
									'B432',
									'B433',
									'B434',
									'B435',
									'B436',
									'B437',
									'B438',
									'B53'
									);
		
			for(var b1 = 0; b1 < arrayB1.length; b1++)	
			{
				$("#"+arrayB1[b1]).attr('disabled','disabled');
			}
			for(var b2 = 0; b2 < arrayB2.length; b1++)		
			{
				$("#"+arrayB2[b2]).attr('disabled','disabled');
			}
			// $('#B232').removeClass('required');
			// $('#B231').removeClass('required');
		
	 }
	 
	 
		
	});
	
	
	
	// SECTION II.A.4
	// INC 15 - VALUE COST
	$("#IIA42").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#IIA44").val('');
				$("#IIA45").val('');
	});
	$("#IIA43").change(function(){
	
		if($("#IIA42").val().length > 0)
		{
			if($("#IIA43 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#IIA44").blur(function(){
		if($(this).val().length > 0)
			$("#IIA43").val('');
		
	});
	$("#IIA45").blur(function(){
		if($(this).val().length == 0 && $("#IIA44").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#IIA46").change(function(){
	
		if($("#IIA45").val().length > 0 && $("#IIA44").val().length > 0 )
		{
			if($("#IIA46 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	// SECTION II.B.4
	// INC 15 - VALUE COST
	$("#IIB42").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#IIA44").val('');
				$("#IIB45").val('');
	});
	$("#IIB43").change(function(){
	
		if($("#IIB42").val().length > 0)
		{
			if($("#IIB43 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#IIB44").blur(function(){
		if($(this).val().length > 0)
			$("#IIB43").val('');
		
	});
	$("#IIB45").blur(function(){
		if($(this).val().length == 0 && $("#IIB44").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#IIB46").change(function(){
	
		if($("#IIB45").val().length > 0 && $("#IIB44").val().length > 0 )
		{
			if($("#IIB46 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	
	
	// settings for III11 - Main financing conditions
		$('#III11').removeClass('required');
		if($("#IIA41").val().length > 0)
		{
			$("#III11").removeAttr('disabled');
			$('#III11').addClass('required');
		}
		else
		{
			$("#III11").attr('disabled','disabled');
			$('#III11').removeClass('required');
		}
		
		$('#IIA41').blur(function(){
			
			if($("#IIA41").val().length > 0)
			{
				$("#III11").removeAttr('disabled');
				$('#III11').addClass('required');
			}
			else
			{
				$("#III11").attr('disabled','disabled');
				$('#III11').removeClass('required');
			}
		
		});
	
	
	// setting condition for V11 - Relates to EU projects
	
		$("#VI12").attr('disabled','disabled');
		
		$('#VI11').change(function(){
			
			
			if($("#VI11").attr("name").split("#")[2] == "RELATES_TO_EU_PROJECT_YES")
			{
				$("#VI12").removeAttr('disabled');
			}
			else
			{
				$("#VI12").attr('disabled','disabled');
			}
	
		});
	
	// SETTINGS temp for SECTION IV until find relations with section II.Boolean
				$("#III11").removeAttr('disabled');
				$('#III11').addClass('required');
	
	
	// settings for A2 
		$("#A\\.II").attr('style','display:none');
		$("#A\\.III").attr('style','display:none');
		$("#A\\.IV").attr('style','display:none');
		$("#AI111").removeClass('required');
		$("#AII11").removeClass('required');
		$("#AIII1").removeClass('required');
		$("#A411").removeClass('required');
		$("#AV1").removeClass('required');
		
		$('#I114').change(function(){
			if($(this).val() == 'A.I')
			{
				$("#AI111").addClass('required');
			}
			else
			{
				$("#AI111").removeClass('required');
			}
		});
		$('#I40').change(function(){
			if($(this).val() == 'A.I')
			{
				$("#AV1").addClass('required');
			}
			else
			{
				$("#AV1").removeClass('required');
			}
		});
		
		if($("#VI31").val().length > 0)
		{
			$("#A\\.II").attr('style','display:block');
			$("#AII11").addClass('required');
		}
		else
		{
			$("#A\\.II").attr('style','display:none');
			$("#AII11").removeClass('required');
		}
		
		$('#VI31').blur(function(){
			
			if($("#VI31").val().length > 0)
			{
				$("#A\\.II").attr('style','display:block');
				$("#AII11").addClass('required');
			}
			else
			{
				$("#A\\.II").attr('style','display:none');
				$("#AII11").removeClass('required');
			}
		
		});
		
	// settings for A3 
		if($("#VI32").val().length > 0)
		{
			$("#A\\.III").attr('style','display:block');
			$("#AIII1").addClass('required');
		}
		else
		{
			$("#A\\.III").attr('style','display:none');
			$("#AIII1").removeClass('required');
		}
		
		$('#VI32').blur(function(){
			
			if($("#VI31").val().length > 0)
			{
				$("#A\\.III").attr('style','display:block');
				$("#AIII1").addClass('required');
			}
			else
			{
				$("#A\\.III").attr('style','display:none');
				$("#AIII1").removeClass('required');
			}
		
		});
	
	// settings for A4 
		if($("#VI33").val().length > 0)
		{
			$("#A\\.IV").attr('style','display:block');
			$("#A411").addClass('required');
		}
		else
		{
			$("#A\\.IV").attr('style','display:none');
			$("#A411").removeClass('required');
		}
		
		$('#VI33').blur(function(){
			
			if($("#VI31").val().length > 0)
			{
				$("#A\\.IV").attr('style','display:block');
				$("#A411").addClass('required');
			}
			else
			{
				$("#A\\.IV").attr('style','display:none');
				$("#A411").removeClass('required');
			}
		
		});
		
	//settings for additional B	
	
		//default settings
		$("#B").attr('style','display:none');
	
		$('#IIA47').change(function(){
			
			
			if($("#IIA47").attr("name").split("#")[2] == "F01_DIV_INTO_LOT_YES")
			{
				$("#B").attr('style','display:block');
				
				
				
			}
			else
			{
				$("#B").attr('style','display:none');
			}
	
		});	
		$('#IIB47').change(function(){
			
			
			if($("#IIB47").attr("name").split("#")[2] == "F01_DIV_INTO_LOT_YES")
			{
				$("#B").attr('style','display:block');
			}
			else
			{
				$("#B").attr('style','display:none');
			}
	
		});	
		
		$('#B231').removeClass('required');
		$('#B232').removeClass('required');
		// settings for section B
		var Barray = new Array('B4',
									'B5',
									'B6',
									'B212',
									'B222',
									'B232',
									'B242',
									'B322',
									'B332',
									'B342',
									'B352',
									'B362',
									'B425',
									'B426',
									'B427',
									'B428',
									'B429',
									'B430',
									'B431',
									'B432',
									'B433',
									'B434',
									'B435',
									'B436',
									'B437',
									'B438',
									'B53'
								);
		
	for(var j = 0; j < Barray.length; j++)		
	{
		
		$("#"+Barray[j]).attr('disabled','disabled');
	}
	

		
	// SECTION B.3
	// INC 15  - VALUE_COST
	$("#B321").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#B341").val('');
				$("#B351").val('');
	});
	$("#B331").change(function(){
	
		if($("#B321").val().length > 0)
		{
			if($("#B331 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#B341").blur(function(){
		if($(this).val().length > 0)
			$("#B321").val('');
		
	});
	$("#B351").blur(function(){
		if($(this).val().length == 0 && $("#B341").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#B361").change(function(){
	
		if($("#B351").val().length > 0 && $("#B341").val().length > 0 )
		{
			if($("#B361 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
		
// INC 15  - VALUE_COST
	$("#B322").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#B342").val('');
				$("#B352").val('');
	});
	$("#B332").change(function(){
	
		if($("#B322").val().length > 0)
		{
			if($("#B332 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#B342").blur(function(){
		if($(this).val().length > 0)
			$("#B322").val('');
		
	});
	$("#B352").blur(function(){
		if($(this).val().length == 0 && $("#B342").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#B362").change(function(){
	
		if($("#B352").val().length > 0 && $("#B342").val().length > 0 )
		{
			if($("#B362 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	

	// SECTION B.4
	//for works
	$('#B417').attr('title','Date must be bigger than : '+$('B411').val());
	$('#B411').attr('title','Date must be bigger than : '+$('VI4').val());
	
	$('#B415').blur(function(){
		$('#B411').val();
		$('#B416').val();
		$('#B421').val();
		$('#B417').val();
	});
	$('#B416').blur(function(){
		$('#B411').val();
		$('#B415').val();
		$('#B421').val();
		$('#B417').val();
	});
	$('#B417').blur(function(){
		$('#B415').val();
		$('#B416').val();
		$('#B421').val();
	});
	$('#B421').blur(function(){
		$('#B415').val();
		$('#B416').val();
		if($(this).val().length == 0 && $('#B421').val().length > 0)
			$(this).addClass('required');
		else
			$(this).removeClass('required');
		
		
	});
	//for supplies
	$('#B431').attr('title','Date must be bigger than : '+$('B425').val());
	$('#B425').attr('title','Date must be bigger than : '+$('VI4').val());
	
	$('#B430').blur(function(){
		$('#B429').val();
		$('#B425').val();
		$('#B431').val();
		$('#B435').val();
	});
	$('#B429').blur(function(){
		$('#B425').val();
		$('#B430').val();
		$('#B431').val();
		$('#B435').val();
	});
	$('#B431').blur(function(){
		$('#B430').val();
		$('#B429').val();
		$('#B435').val();
	});
	$('#B435').blur(function(){
		$('#B430').val();
		$('#B429').val();
		if($(this).val().length == 0 && $('#B431').val().length > 0)
			$(this).addClass('required');
		else
			$(this).removeClass('required');
		
		
	});
	
	
	

});