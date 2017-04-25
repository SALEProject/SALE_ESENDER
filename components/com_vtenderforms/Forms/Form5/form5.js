$(document).ready(function(){
	
	$(document).tooltip();
	
	// Section II.1.2 Type of contract and location -> Inc 11
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
	
	// duration framework year
	$("#II144").blur(function(){
		if($(this).val().length > 0)
			$("#II145").val('');
			
	});
	
	$("#II145").blur(function(){
		if($(this).val().length > 0)
			$("#II144").val('');
	});
	
	
	// inc 15 VALUE COST
	$("#II1461").blur(function(){
		
		if($(this).val().length > 0)
		{
			$("#II1463").val('');
			$("#II1464").val('');
		}			
		
	});
	
	$("#II1462").change(function(){
	
		if($("#II1461").val().length > 0)
		{
			if($("#II1462 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#II1463").blur(function(){
		if($(this).val().length > 0)
			$("#II1461").val('');
		
	});
	$("#II1464").blur(function(){
		if($(this).val().length == 0 && $("#II1463").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#II1465").change(function(){
	
		if($("#II1463").val().length > 0 && $("#II1464").val().length > 0 )
		{
			if($("#II1465 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	
	// SECTION II.2.1 - >total quantity or scope
	// inc 15 VALUE COST
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




	
	//SECTION II.2.6
	$("#II228").blur(function(){
		if($(this).val().length > 0)
			$("#II229").val('');
			$("#II230").val('');
				
		
	});
	$("#II229").blur(function(){
		if($(this).val().length > 0)
			$("#II228").val('');
				
		
	});
	$("#II230").blur(function(){
		if($(this).val().length == 0 && $("#II229").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});
	
	$("#II231").blur(function(){
		if($(this).val().length > 0)
			$("#II232").val('');
				
		
	});
	$("#II232").blur(function(){
		if($(this).val().length > 0)
			$("#II231").val('');
				
		
	});
	
	//SECTION II.3
	$("#II314").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II315").val('');
			$("#II322").val('');
			$("#II323").val('');
		}	
		
	});
	$("#II315").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II314").val('');
			$("#II322").val('');
			$("#II323").val('');
		}	
		
	});
	$("#II322").blur(function(){
		if($(this).val().length > 0)
		{
			$("#II314").val('');
			$("#II315").val('');
		}	
		
	});
	$("#II323").blur(function(){
		if($(this).val().length  == 0 && $("#II322").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});
	
	// SECTION IV.1.1
	
	$("#IV112").attr('style','display:none');
	$(".IV112").attr('style','display:none');
	
	$("#II13").change(function(){
		if($("#II13").val() == 'SETTING_UP_DPS ')
		{
			$("#IV111").prop('selectedIndex',1);
		}
	});
	$("#IV111").change(function(){
		if($("#IV111").val() == 'NEGOTIATED')
		{
			$("#IV112").attr('style','display:block');
			$(".IV112").attr('style','display:block');
			
		}
		else
		{
			$("#IV112").attr('style','display:none');
			$(".IV112").attr('style','display:none');
			
		}
	});
	
	// SECTION IV.3.3 -> Conditions for obtaining specifications and additional documents or descriptive document
	 // se face verificarea conditiilor la submit
	// IV.3.6 - se face verificare la submit
	
	// SECTION IV.3.7 LANGUAGES
	$("#IV353").attr('style','display:none');
	$(".IV353").attr('style','display:none');
	
	$("#IV351").change(function(){
		$("IV352").prop('selectedIndex',0);
		if($("#IV351").val() == 'YES')
		{
			$("#IV353").attr('style','display:block');
			$(".IV353").attr('style','display:block');
			
		}	
		else
		{
			$("#IV353").attr('style','display:none');
			$(".IV353").attr('style','display:none');
		}
	});
	$("#IV352").change(function(){
		
			$("IV351").prop('selectedIndex',0);
			$("#IV353").attr('style','display:none');
			$(".IV353").attr('style','display:none');
		
	});
	
	// SECTION IV.3.8 Minimum Date
	$("#IV36101").blur(function(){
		$("#IV364").val('');
		$("#IV365").val('');
	});
	$("#IV364").blur(function(){
		$("#IV36101").val('');
		$("#IV365").val('');
	});
	$("#IV365").blur(function(){
		$("#IV36101").val('');
		$("#IV364").val('');
	});
	
	// SECTION B.3
	$("#B32").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B34").val('');
			$("#B35").val('');
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
	
	
	// SECTION B.4
	$("#B41").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B42").val('');
			$("#B431").val('');
			$("#B461").val('');
		}	
		
	});
	$("#B42").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B41").val('');
			$("#B431").val('');
			$("#B461").val('');
		}	
		
	});
	$("#B431").blur(function(){
		if($(this).val().length > 0)
		{
			$("#B41").val('');
			$("#B42").val('');
		}	
		
	});
	$("#B461").blur(function(){
		if($(this).val().length == 0)
		{
			if($("#B431").val().length == 0)
			{
				$(this).addClass('required');
				$("#B431").addClass('required');
			}
			else
			{
				$(this).addClass('required');
				$("#B431").removeClass('required');	
			}
		}
		else
		{
			$(this).removeClass('required');
			if($("#B431").val().length == 0)
				$("#B431").addClass('required');
			else
				$("#B431").removeClass('required');	
		}
		
	});
	
	
	// SECTION IV 
	$('#IV111').change(function(){
		if($(this).val() == 'OPEN')
		{
			$('#IV34101').addClass('required');
			
		}
		else
		{
			$('#IV34101').removeClass('required');
		}
	
	});
	
	
	// notice dispatch date influation
	// $('#IV3293').datepicker('option','maxDate',$('#VI5').val());
	// $('#IV34101').datepicker('option','minDate',$('#VI5').val());
	// $('#IV34101').change(function(){
		// $('#IV36101').datepicker('option','minDate',$('#IV34101').val());
		// $('#IV371101').datepicker('option','minDate',$('#IV34101').val());
	// });
	
	// $("#submit").click(function(e){			
		$("#frm").submit(function(e){		
			var ok = true; 
			var ret = true;
			// alert('1');
			// check dates
			if($('#IV111').val() == 'OPEN')
			{
				// alert('2');
				if($('#IV33101').val().length > 0)
				{
					// alert('3');
					$('#IV33101').removeClass('required');
					if($('#IV34101').val().length > 0)
					{
						// alert('4');
						$('#IV34101').removeClass('required');
						if($('#IV36101').val().length > 0)
						{
							// alert('5');
							$('#IV36101').removeClass('required');
							if($('#IV371101').val().length > 0)
							{
									
									// alert('6');
									if(
										$.datepicker.parseDate('mm/dd/yy', $('#IV33101').val()) - $.datepicker.parseDate('mm/dd/yy', $('#IV34101').val()) > 1 ||
										$.datepicker.parseDate('mm/dd/yy', $('#IV36101').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV34101').val()) ||
										$.datepicker.parseDate('mm/dd/yy', $('#IV371101').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV34101').val()) 
									)
									{
										// alert('7');
										$('#IV33101').removeClass('required');
										$('#IV34101').removeClass('required');
										$('#IV36101').removeClass('required');
										$('#IV371101').removeClass('required');
										
										createTooltipText('IV34101','The date must be bigger then '+$('#IV33101').val()+' and lower than '+ $('#IV36101').val()+' and '+$('#IV371101').val()+'');	
										// displayErrorHints();
										ok = false;
									}									
							}
							else
							{
								// alert('8');
								$('#IV371101').addClass('required');
							}
						}
						else
						{
							// alert('9');
							$('#IV36101').addClass('required');
						}
					}
					else
					{
						// alert('10');
						$('#IV34101').addClass('required');
					}
				}
				else
				{
					// alert('12');
					$('#IV33101').addClass('required');
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
		});		
	
	
	
	
	
});