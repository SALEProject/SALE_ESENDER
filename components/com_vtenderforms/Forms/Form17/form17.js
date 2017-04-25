$(document).ready(function(){
	
	

	$("#frm").submit(function(e){
	
		var ok = true; 
		var ret = true;
		// alert('1');
		// check dates
		
			// alert('2');
			if($('#IV3216').val().length > 0)
			{
				// alert('3');
				$('#IV3216').removeClass('required');
				if($('#VI5').val().length > 0)
				{
					// alert('4');
					$('#VI5').removeClass('required');
					
						if(
							$.datepicker.parseDate('mm/dd/yy', $('#IV3216').val()) > $.datepicker.parseDate('mm/dd/yy', $('#VI5').val()) 
						)
						{
							// alert('7');
							$('#IV3216').removeClass('required');
							$('#VI5').removeClass('required');
							
							createTooltipText('IV3216','The date must be  lower than '+ $('#VI5').val()+' ');	
							// displayErrorHints();
							ok = false;
						}									
						
					
				}
				else
				{
					// alert('10');
					$('#VI5').addClass('required');
				}
			}
			else
			{
				// alert('12');
				$('#IV3216').addClass('required');
			}
		
		
			// SECTION IV 
			// alert('2');
				if($('#IV3216').val().length > 0)
				{
					// alert('3');
					$('#IV3216').removeClass('required');
					if($('#IV331').val().length > 0)
					{
						// alert('4');
						$('#IV331').removeClass('required');
						if($('#IV34').val().length > 0)
						{
							// alert('5');
							$('#IV34').removeClass('required');
							if($('#IV35').val().length > 0)
							{
								$('#IV35').removeClass('required');	
								if($('#VI5').val().length > 0)
								{
									$('#VI5').removeClass('required');	
									// alert('6');
									if(
										$.datepicker.parseDate('mm/dd/yy', $('#IV3216').val()) > $.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) > 1 ||
										$.datepicker.parseDate('mm/dd/yy', $('#IV331').val()) >= $.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) ||
										$.datepicker.parseDate('mm/dd/yy', $('#IV35').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) ||
										$.datepicker.parseDate('mm/dd/yy', $('#VI5').val()) > $.datepicker.parseDate('mm/dd/yy', $('#IV34').val()) 
									)
									{
										// alert('7');
										$('#IV3216').removeClass('required');
										$('#IV331').removeClass('required');
										$('#IV34').removeClass('required');
										$('#IV35').removeClass('required');
										$('#VI5').removeClass('required');
										
										createTooltipText('IV34','The date must be bigger then '+ $('#IV3216').val()+' and '+$('#IV331').val()+' and lower than '+ $('#IV35').val()+' and '+$('#VI5').val()+'');	
										// displayErrorHints();
										ok = false;
									}			
								}
								else
								{
									// alert('8');
									$('#VI5').addClass('required');
								}
							}
							else
							{
								// alert('8');
								$('#IV35').addClass('required');
							}
						}
						else
						{
							// alert('9');
							$('#IV34').addClass('required');
						}
					}
					else
					{
						// alert('10');
						$('#IV331').addClass('required');
					}
				}
				else
				{
					// alert('12');
					$('#IV3216').addClass('required');
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
		
		errorsSectionI.push("Date must be bigger than notice dispatch date!");
	
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
	
	// Section II.1.2 Type of contract and location -> Inc 11
	$("#II122").attr('style','display:none');
	$("#II123").attr('style','display:none');
	$("#II124").attr('style','display:none');
	$(".II122").attr('style','display:none');
	$(".II123").attr('style','display:none');
	$(".II124").attr('style','display:none');
	$("#III\\.3").attr('style','display:none');
	$(".III\\.3").attr('style','display:none');
	
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
							$("#III\\.3").attr('style','display:none');
							$(".III\\.3").attr('style','display:none');
							break;
			case 'SUPPLIES': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:block');
							$("#II124").attr('style','display:none');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:block');
							$(".II124").attr('style','display:none');
							$("#III\\.3").attr('style','display:none');
							$(".III\\.3").attr('style','display:none');
							break;
			case 'SERVICES': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:none');
							$("#II124").attr('style','display:block');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:none');
							$(".II124").attr('style','display:block');
							$("#III\\.3").attr('style','display:block');
							$(".III\\.3").attr('style','display:block');
							break;
			case '': 
							$("#II122").attr('style','display:none');
							$("#II123").attr('style','display:none');
							$("#II124").attr('style','display:none');
							$(".II122").attr('style','display:none');
							$(".II123").attr('style','display:none');
							$(".II124").attr('style','display:none');
							$("#III\\.3").attr('style','display:none');
							$(".III\\.3").attr('style','display:none');
							
							break;
							
		}
		
	});
	
	
	// SECTION II.1.3 motice involves
	$("#II\\.1\\.4").attr('style','display:none');
	$("#II13").change(function(){
		if($(this).val() == 'ESTABLISHMENT_FRAMEWORK_AGREEMENT')
			$("#II\\.1\\.4").attr('style','display:block');
		else
			$("#II\\.1\\.4").attr('style','display:none');
	});
	
	// SECTION II.1.4 -> INC 15
	$("#II147").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#II149").val('');
				$("#II150").val('');
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
	$("#II150").blur(function(){
		if($(this).val().length == 0 && $("#II149").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#II151").change(function(){
	
		if($("#II150").val().length > 0 && $("#II149").val().length > 0 )
		{
			if($("#II151 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	//SECTION II.1.4 
	$("#II144").blur(function(){
		$("#II145").val('');
	});
	$("#II145").blur(function(){
		$("#II144").val('');
	});
	$("#II146").blur(function(){
		if($("#II144").val().length > 0)
			if($("#II144").val() < 7)
				alert("Valoarea trebuie sa fie mai mare ca 7");
		else
			if($("#II145").val().length > 0)
				if($("#II145").val() < 84)
					alert("Valoarea trebuie sa fie mai mare ca 84");
	});
	
	//SECTION II.1.7
	$("#II175").attr('style','display:none');
	$(".II175").attr('style','display:none');
	$("#II176").attr('style','display:none');
	$(".II176").attr('style','display:none');
	
	$("#II174").blur(function(){
		if($("#II174").val() == "YES")
		{
			$("#II175").attr('style','display:block');
			$(".II175").attr('style','display:block');
			$("#II176").attr('style','display:block');
			$(".II176").attr('style','display:block');
		}
		else
		{
			$("#II175").attr('style','display:none');
			$(".II175").attr('style','display:none');
			$("#II176").attr('style','display:none');
			$(".II176").attr('style','display:none');
		}
	});
	
	$("#II176").blur(function(){
		if($("#II175").val() < 0)
			alert("Valoarea trebuie sa fie mai mare ca 0");
	});
	
	// SECTION II.2.1 INC 15
	$("#II212").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#II214").val('');
				$("#II215").val('');
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
			(this).removeClass('required');
	});
	
	$("#II216").change(function(){
	
		if($("#II215").val().length > 0 && $("#II214").val().length > 0 )
		{
			if($("#II216 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	//SECTION II.3
	$("#II31").blur(function(){
		$("#II32").val('');
		$("#II33").val('');
		$("#II34").val('');
		
	});
	$("#II32").blur(function(){
		$("#II31").val('');
		$("#II33").val('');
		$("#II34").val('');
		
	});
	$("#II33").blur(function(){
		$("#II31").val('');
		$("#II32").val('');
	});
	$("#II34").blur(function(){
		$("#II31").val('');
		$("#II32").val('');
		if($(this).val().length == 0 && $("#II34").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});
	
	//SECTION IV.1.1.111
	$("#IV121").attr('style','display:none');
	$("#IV122").attr('style','display:none');
	$("#IV123").attr('style','display:none');
	$("#IV124").attr('style','display:none');
	$(".IV121").attr('style','display:none');
	$(".IV122").attr('style','display:none');
	$(".IV123").attr('style','display:none');
	$(".IV124").attr('style','display:none');
	
	$("#IV111-5").change(function(){
		switch($("#IV111-5").val())
		{
			case "NEGOCIATED" :
								$("#IV121").attr('style','display:block');
								$("#IV122").attr('style','display:block');
								$("#IV123").attr('style','display:block');
								$("#IV124").attr('style','display:block');
								$(".IV121").attr('style','display:block');
								$(".IV122").attr('style','display:block');
								$(".IV123").attr('style','display:block');
								$(".IV124").attr('style','display:block');
								break;
			case "RESTRICTED" :
								$("#IV121").attr('style','display:block');
								$("#IV122").attr('style','display:block');
								$("#IV123").attr('style','display:block');
								$("#IV124").attr('style','display:block');
								$(".IV121").attr('style','display:block');
								$(".IV122").attr('style','display:block');
								$(".IV123").attr('style','display:block');
								$(".IV124").attr('style','display:block');
								break;	
			
			case "COMPETITIVE_DIALOGUE" :
											$("#IV121").attr('style','display:block');
											$("#IV122").attr('style','display:block');
											$("#IV123").attr('style','display:block');
											$("#IV124").attr('style','display:block');
											$(".IV121").attr('style','display:block');
											$(".IV122").attr('style','display:block');
											$(".IV123").attr('style','display:block');
											$(".IV124").attr('style','display:block');
											break;	
			
			default:
						$("#IV121").attr('style','display:none');
						$("#IV122").attr('style','display:none');
						$("#IV123").attr('style','display:none');
						$("#IV124").attr('style','display:none');
						$(".IV121").attr('style','display:none');
						$(".IV122").attr('style','display:none');
						$(".IV123").attr('style','display:none');
						$(".IV124").attr('style','display:none');
						break;
			
		}
		
	});
	
	$("#IV121").blur(function(){
		$("#IV122").val('');
		$("#IV123").val('');
		
	});
	$("#IV122").blur(function(){
		$("#IV121").val('');
	});
	$("#IV123").blur(function(){
		$("#IV122").val('');
	});
	
	
	
});