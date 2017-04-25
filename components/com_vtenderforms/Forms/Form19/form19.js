$(document).ready(function(){
	
	

	$("#frm").submit(function(e){
	
		var ok = true; 
		var ret = true;
		// alert('1');
		// check dates
		
			// alert('2');
			if($('#IV2320').val().length > 0)
			{
				// alert('3');
				$('#IV2320').removeClass('required');
				
				if($('#IV24110').val().length > 0)
				{
					// alert('4');
					$('#IV24110').removeClass('required');
					
					if($('#VI31').val().length > 0)
					{
						// alert('4');
						$('#VI31').removeClass('required');
							if(
								$.datepicker.parseDate('mm/dd/yy', $('#IV24110').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV2320').val()) ||
								$.datepicker.parseDate('mm/dd/yy', $('#VI31').val()) > $.datepicker.parseDate('mm/dd/yy', $('#IV2320').val()) 
							)
							{
								// alert('7');
								$('#IV2320').removeClass('required');
								$('#IV24110').removeClass('required');
								$('#VI31').removeClass('required');
								
								createTooltipText('IV2320','The date must be  lower than  '+$('#IV24110').val()+' and bigger than '+ $('#VI31').val()+' ');	
								// displayErrorHints();
								ok = false;
							}									
					}
					else
					{
						// alert('10');
						$('#VI31').addClass('required');
					}
					
				}
				else
				{
					// alert('10');
					$('#IV24110').addClass('required');
				}
			}
			else
			{
				// alert('12');
				$('#IV2320').addClass('required');
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
	
	// SECTION II.1.5.2 
	$("#II154").blur(function(){
		$("#II155").val('');
		$("#II156").val('');
	});
	$("#II155").blur(function(){
		$("#II154").val('');
	});
	$("#II156").blur(function(){
		if($("#II154").val() < 7 || $("#II155").val() > 84) 
			// alert('Valoarea trebuie cuprinsa intre 7 si 84!');
			createTooltipText('II156','The value must be lower than  '+ $('#II154').val()+' or'+$("#II155").val()+' ');	
		else
		{
			$(this).attr('title','');
			removeTooltip('II156');
		}	
	});
	
	// VALUE COST
	$("#II157").blur(function(){
		
		if($(this).val().length > 0)
			
				$("#II159").val('');
				$("#II1510").val('');
	});
	$("#II158").change(function(){
	
		if($("#II157").val().length > 0)
		{
			if($("#II158 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#II159").blur(function(){
		if($(this).val().length > 0)
			$("#II157").val('');
		
	});
	$("#II1510").blur(function(){
		if($(this).val().length == 0 && $("#II159").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			(this).removeClass('required');
	});
	
	$("#II1511").change(function(){
	
		if($("#II1510").val().length > 0 && $("#II159").val().length > 0 )
		{
			if($("#II1511 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	// SECTION II.2.1
	// INC 15
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

	// SECTION II.3 Duration time limit
	$("#II31").blur(function(){
		$("#II32").val('');
		$("#II331").val('');
		$("#II334").val('');
		
	});
	$("#II32").blur(function(){
		$("#II31").val('');
		$("#II331").val('');
		$("#II334").val('');
		
	});
	$("#II331").blur(function(){
		$("#II31").val('');
		$("#II32").val('');
	});
	$("#II334").blur(function(){
		$("#II31").val('');
		$("#II32").val('');
		if($(this).val().length == 0 && $("#II331").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});
	
	//SECTION IV.2.5 - LANGUAGES
	$("#IV253").attr('style','display:none');
	$(".IV253").attr('style','display:none');
	
	$("#IV251").change(function(){
		$("IV252").prop('selectedIndex',0);
		if($("#IV251").val() == 'YES')
		{
			$("#IV253").attr('style','display:block');
			$(".IV253").attr('style','display:block');
			
		}	
		else
		{
			$("#IV253").attr('style','display:none');
			$(".IV253").attr('style','display:none');
		}
	});
	$("#IV252").change(function(){
		
			$("IV251").prop('selectedIndex',0);
			$("#IV253").attr('style','display:none');
			$(".IV253").attr('style','display:none');
		
	});
	
	
	
	
	
});