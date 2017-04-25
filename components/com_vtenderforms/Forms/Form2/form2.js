$(document).ready(function(){
	
	

	$("#frm").submit(function(e){
	
		
		if($('#IV111').val() == 'OPEN')
		{
			if($('#IV331-5').val().length > 0)
			{
				$('#IV331-5').removeClass('required');
				
				if($('#IV34').val().length > 0)
				{
					$('#IV34').removeClass('required');
					
					if($('#VI5').val().length > 0)
					{
						$('#VI5').removeClass('required');
						
							if(
								$.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV331-5').val())  ||
								$.datepicker.parseDate('mm/dd/yy', $('#VI5').val()) > $.datepicker.parseDate('mm/dd/yy', $('#IV331-5').val())
							)
							{
								// alert('7');
								$('#IV331-5').removeClass('required');
								$('#IV34').removeClass('required');
								$('#VI5').removeClass('required');
								
								createTooltipText('IV331-5','The date must be bigger then '+$('#VI5').val()+' and lower than '+ $('#IV34').val()+' ');	
								// displayErrorHints();
								ok = false;
							}				
						
					}
					else
					{
						$('#VI5').addClass('required');
					}
				}
				else
				{
					$('#IV34').addClass('required');
				}
			}
			else
			{
				$('#IV331-5').addClass('required');
			}
		
		// SECTION IV34
			if($('#IV34').val().length > 0)
			{
				$('#IV34').removeClass('required');
				
				if($('IV371-3').val().length > 0)
				{
					$('#IV371-3').removeClass('required');
					
					if($('#IV381-4').val().length > 0)
					{
						$('#IV381-4').removeClass('required');	
						
						if(
							$.datepicker.parseDate('mm/dd/yy', $('#IV371-3').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV34').val())  ||
							$.datepicker.parseDate('mm/dd/yy', $('#IV381-4').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV34').val())
						)
						{
							// alert('7');
							$('#IV34').removeClass('required');
							$('#IV371-3').removeClass('required');
							$('#IV381-4').removeClass('required');
							
							createTooltipText('IV34','The date must be lower than '+$('#IV371-3').val()+' and lower than '+ $('#IV381-4').val()+' ');	
							// displayErrorHints();
							ok = false;
						}
						
					}
					else
					{
						$('#IV381-4').addClass('required');
					}
				}
				else
				{
					$('#IV371-3').addClass('required');
				}
			}
			else
			{
				$('#IV34').addClass('required');
			}
		
		}

		// SECTION VI5 - NOTICE DISPACTH Date
		if($('#IV330').val().length > 0 )
		{
			$('#IV330').removeClass('required');
			
			if($('#IV34').val().length > 0)
			{
				$('#IV34').removeClass('required');
				
				if($('#VI5').val().length > 0)
				{
					$('#VI5').removeClass('required');
					
					if(
						$.datepicker.parseDate('mm/dd/yy', $('#IV330').val()) > $.datepicker.parseDate('mm/dd/yy', $('#VI5').val())  ||
						$.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) < $.datepicker.parseDate('mm/dd/yy', $('#VI5').val())
					)
					{
						// alert('7');
						$('#IV330').removeClass('required');
						$('#IV34').removeClass('required');
						$('#VI5').removeClass('required');
						
						createTooltipText('VI5','The date must be bigger than '+$('#IV330').val()+' and lower than '+ $('#IV34').val()+' ');	
						// displayErrorHints();
						ok = false;
					}
				}
				else
				{
					$('#VI5').addClass('required');
				}
			}
			else
			{
				$('#IV34').addClass('required');
			}
		}
		else
		{
			$('#IV330').addClass('required');
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
	
	//SECTION II.1.2
	$("#II122").attr('style','display:none');
	$("#II123").attr('style','display:none');
	$("#II124").attr('style','display:none');
	$(".II122").attr('style','display:none');
	$(".II123").attr('style','display:none');
	$(".II124").attr('style','display:none');
	
	$("#II121").change(function(){
		
		switch($("#II121").val())
		{
			case 'WORKS': 
							$("#II122").attr('style','display:block');
							$("#II123").attr('style','display:none');
							$("#II124").attr('style','display:none');
							$(".II122").attr('style','display:block');
							$(".II123").attr('style','display:none');
							$(".II124").attr('style','display:none');
							
							break;
			case 'SUPPLIES': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:block');
							$("#II124").attr('style','display:none');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:block');
							$(".II124").attr('style','display:none');
							
							break;
			case 'SERVICES': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:none');
							$("#II124").attr('style','display:block');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:none');
							$(".II124").attr('style','display:block');
							
							break;
			case '': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:none');
							$("#II124").attr('style','display:none');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:none');
							$(".II124").attr('style','display:none');
							
							break;
							
		}
		
	});
	
	
	// SECTION II.1.4
	$('#II13').change(function(){
		if($("#II13 option:selected").val() == 'II.1.4');
		{
			$('#II\\.1\\.6').attr('style','display:block');
		}
		else
		{
			$('#II\\.1\\.6').attr('style','display:none');
		}
	});
	
	//SECTION II.1.6
	
	$('#II144').blur(function(){
		if($(this).val().length > 0)
		{
			 $('#II145').val('');
		}
	});
	$('#II145').blur(function(){
		if($(this).val().length > 0)
		{
			 $('#II144').val('');
		}
	});
	$('#II146').blur(function(){
		if($(this).val().length > 0)
		{
			if( $('#II145').val() < 4 || $('#II145').val()  < 48)
			{
				$(this).val('');
			}
		}
	});
	
	//INC-15 VALUE_COST
		$("#II147").blur(function(){
		
		if($(this).val().length > 0)
		{	
				$("#II149").val('');
				$("#II14710").val('');
		}		
		
	});
	
	$("#II148").change(function(){
	
		if($("#II147").val().length > 0)
		{
			if($("#II148 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#II149").blur(function(){
		if($(this).val().length > 0)
			$("#II147").val('');
				
	});
	$("#II14710").blur(function(){
		if($(this).val().length == 0 && $("#II149").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});

	$("#II14711").change(function(){
	
		if($("#II149").val().length > 0 && $("#II14710").val().length > 0 )
		{
			if($("#II14711 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	//SECTION II.2.1
	// INC-15 VALUE_COST
	
		$("#II212").blur(function(){
		
		if($(this).val().length > 0)
		{	
				$("#II214").val('');
				$("#II215").val('');
		}		
		
	});
	
	$("#II213").change(function(){
	
		if($("#II212").val().length > 0)
		{
			if($("#II213 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#II214").blur(function(){
		if($(this).val().length > 0)
			$("#II212").val('');
				
	});
	$("#II215").blur(function(){
		if($(this).val().length == 0 && $("#II214").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});

	$("#II216").change(function(){
	
		if($("#II214").val().length > 0 && $("#II215").val().length > 0 )
		{
			if($("#II216 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	// SECTION II.2.4
	$('#II2221').blur(function(){
		if($(this).val().length > 0)
			$('#II2222').val('');
	});
	$('#II2222').blur(function(){
		if($(this).val().length > 0)
			$('#II2221').val('');
	});
	
	//SECTION II.2.6
	
	$('#II2228').attr('style','display:none');
	
	$('#II2226').blur(function(){
		if($(this).val().length > 0)
		{
			$('#II2227').val();
			$('#II2228').val();
		}
		
	});
	$('#II2227').blur(function(){
		if($(this).val().length > 0)
		{
			$('#II2226').val();
			$('#II2228').attr('style','display:block');
		}
		else
		{
			$('#II2228').attr('style','display:none');
		}
	
	});
	
	$('#II2229').blur(function(){
		if($(this).val().length > 0)
		{
			$('#II2230').val();
		}
		
	});
	$('#II2230').blur(function(){
		if($(this).val().length > 0)
		{
			$('#II2229').val();
		}
		
	});
	
	//SECTION II.3
	
	$("#II31").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II32").val('');
			$("#II33").val('');
			$("#II37").val('');
		}	
		
	});
	$("#II32").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II31").val('');
			$("#II33").val('');
			$("#II37").val('');
		}	
		
	});
	$("#II33").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II31").val('');
			$("#II32").val('');
		}	
		
	});
	$("#II37").blur(function(){
		if($(this).val().length  == 0 && $("#II33").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});
	
	
	
	//SECTION IV.1.1
	
	$('#IV113').attr('style','display:none');
	$('#IV114').attr('style','display:none');
	
	$('#IV111').change(function(){
		if($("#IV111 option:selected").val() == 'NEGOTIATED')
		{
			$('#IV113').attr('style','display:block');
			$('#IV\\.1\\.2').attr('style','display:block');
			
		}
		else
		{
			$('#IV113').attr('style','display:none');
			$('#IV\\.1\\.2').attr('style','display:none');
		}
		
		if($("#IV111 option:selected").val() == 'ACCELERATED_NEGOTIATED')
			$('#IV114').attr('style','display:none');
		else
		{
			$('#IV114').attr('style','display:none');
		}
		if($("#IV111 option:selected").val() == 'RESTRICTED' || $("#IV111 option:selected").val() == 'COMPETITIVE_DIALOGUE' || $("#IV111 option:selected").val() == 'NEGOTIATED' )
		{	
			$('#IV\\.1\\.2').attr('style','display:block');
			$('#IV\\.3\\.6').attr('style','display:block');
		}	
		else
		{
			$('#IV\\.1\\.2').attr('style','display:none');
			$('#IV\\.3\\.6').attr('style','display:none');
		}
		if($("#IV111 option:selected").val() == 'COMPETITIVE_DIALOGUE' || $("#IV111 option:selected").val() == 'NEGOTIATED' )
			$('#IV\\.1\\.3').attr('style','display:block');
		else
		{
			$('#IV\\.1\\.3').attr('style','display:none');
		}
		if($("#IV111 option:selected").val() == 'OPEN' )
		{
			$('#IV\\.3\\.8').attr('style','display:block');
			$('#IV\\.3\\.9').attr('style','display:block');
		}
		else
		{
			$('#IV\\.3\\.8').attr('style','display:none');
			$('#IV\\.3\\.9').attr('style','display:none');
		}
		
		
		
	});
	
	$('#IV121').blur(function(){
		if($(this).val().length > 0)
		{
			$('#IV122').val('');
		}
	});
	$('#IV122').blur(function(){
		if($(this).val().length > 0)
		{
			$('#IV121').val('');
		}
	});
	$('#IV123').blur(function(){
		if($(this).val().length == 0 && $('#IV121').val().length >0)
		{
			$(this).addClass('required');
		}
		else
		{
			$(this).removeClass('required');
		}
	});
	
	
	//SECTION IV.2.1
	$('#IV211').change(function(){
		if($("#IV211 option:selected").val() == 'MOST_ECONOMICALLY_TENDER')
			$('#IV\\.2\\.1\\.0').attr('style','display:block');
		else
			$('#IV\\.2\\.1\\.0').attr('style','display:none');
	});
	
	
	//SeCTION IV.3.7 - LANGUAGES
	$("#IV363").attr('style','display:none');
	$(".IV363").attr('style','display:none');
	
	$("#IV361").change(function(){
		$("IV362").prop('selectedIndex',0);
		if($("#IV361").val() == 'YES')
		{
			$("#IV363").attr('style','display:block');
			$(".IV363").attr('style','display:block');
			
		}	
		else
		{
			$("#IV363").attr('style','display:none');
			$(".IV363").attr('style','display:none');
		}
	});
	$("#IV362").change(function(){
		
			$("IV361").prop('selectedIndex',0);
			$("#IV363").attr('style','display:none');
			$(".IV363").attr('style','display:none');
		
	});
	
	
	//SECTION IV.3.8
	$("#IV371-3").blur(function(){
		$("#IV374").val('');
		$("#IV375").val('');
	});
	$("#IV374").blur(function(){
		$("#IV371-3").val('');
		$("#IV375").val('');
	});
	$("#IV375").blur(function(){
		$("#IV371-3").val('');
		$("#IV374").val('');
	});
	
	// SECTION B
	$("#II181").change(function(){
		if($("#IV111 option:selected").val() == 'F02_DIV_INTO_LOT_YES')
		{
			$('#B').attr('style','display:block');
		}
		else
		{
			$('#B').attr('style','display:none');
		}
	}
		
		
	//SECTION B.3
	$("#B32").blur(function(){
		
		if($(this).val().length > 0)
		{	
				$("#B34").val('');
				$("#B35").val('');
		}		
		
	});
	
	$("#B33").change(function(){
	
		if($("#B32").val().length > 0)
		{
			if($("#B33 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#B34").blur(function(){
		if($(this).val().length > 0)
			$("#B32").val('');
				
	});
	$("#B35").blur(function(){
		if($(this).val().length == 0 && $("#B34").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});

	$("#B36").change(function(){
	
		if($("#B34").val().length > 0 && $("#B35").val().length > 0 )
		{
			if($("#B36 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	// SECTION B.4
	
	$("#B411").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B412").val('');
			$("#B419").val('');
			$("#B420").val('');
		}	
		
	});
	$("#B412").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B411").val('');
			$("#B419").val('');
			$("#B420").val('');
		}	
		
	});
	$("#B419").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B411").val('');
			$("#B412").val('');
		}	
		
	});
	$("#B420").blur(function(){
		if($(this).val().length  == 0 && $("#B419").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});

});