$(document).ready(function(){
	
	

	$("#frm").submit(function(e){
	
		var ok = true; 
		var ret = true;
		// alert('1');
		// check dates
		
			// alert('2');
			if($('#IV222').val().length > 0)
			{
				// alert('3');
				$('#IV222').removeClass('required');
				if($('#IV231').val().length > 0)
				{
					// alert('4');
					$('#IV231').removeClass('required');
					if($('#VI21').val().length > 0)
					{
						// alert('5');
						$('#VI21').removeClass('required');
						
						// alert('6');
						if(
							$.datepicker.parseDate('mm/dd/yy', $('#IV222').val()) - $.datepicker.parseDate('mm/dd/yy', $('#IV231').val()) > 1 ||
							$.datepicker.parseDate('mm/dd/yy', $('#VI21').val()) < $.datepicker.parseDate('mm/dd/yy', $('#IV231').val()) 
						)
						{
							// alert('7');
							$('#IV222').removeClass('required');
							$('#IV231').removeClass('required');
							$('#VI21').removeClass('required');
							
							createTooltipText('IV231','The date must be bigger then '+$('#IV222').val()+' and lower than '+ $('#VI21').val()+' ');	
							// displayErrorHints();
							ok = false;
						}									
						
					}
					else
					{
						// alert('9');
						$('#VI21').addClass('required');
					}
				}
				else
				{
					// alert('10');
					$('#IV231').addClass('required');
				}
			}
			else
			{
				// alert('12');
				$('#IV222').addClass('required');
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

	// $(".DATE").val('');
		
		var errorsSectionI = new Array();	
		var errorsSectionIIA = new Array();	
		var errorsSectionIIB = new Array();	
		var errorsSectionIII = new Array();	
		var errorsSectionIV = new Array();	
		var errorsSectionVI = new Array();	
		var errorsSectionA = new Array();	
		var errorsSectionB = new Array();	
		
		// errorsSectionI.push("Date must be bigger than notice dispatch date!");
	
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
	
	// SECTION 0 -> P1
	$("#I\\.3").attr('style','display:none');
	
	
	$("#P1").change(function(){
		if($(this).val() == "DIRECTIVE_2004_17")
		{
			$("#I\\.3").attr('style','display:block');
			
		}
		else
		{
			$("#I\\.3").attr('style','display:none');
			
		}
	});
	
	
	
	
	// SECTION II.5 - >total quantity or scope
	// inc 15 VALUE COST

	$("#II52").blur(function(){
		
		if($(this).val().length > 0)
		{	
				$("#II54").val('');
				$("#II55").val('');
		}		
		
	});
	
	$("#II53").change(function(){
	
		if($("#II52").val().length > 0)
		{
			if($("#II53 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});	
	
	$("#II54").blur(function(){
		if($(this).val().length > 0)
			$("#II52").val('');
				
	});
	$("#II55").blur(function(){
		if($(this).val().length == 0 && $("#II54").val().length > 0)
		{
			$(this).addClass('required');
		}
		else
			$(this).removeClass('required');
	});

	$("#II56").change(function(){
	
		if($("#II54").val().length > 0 && $("#II55").val().length > 0 )
		{
			if($("#II56 option:selected").val().length = 0);
			$(this).addClass('required');
		}
		else
		{	
			$(this).removeClass('required');
		}
		
		
	});
	
	//SECTION IV.2.4 language
	$("#IV243").attr('style','display:none');
	$(".IV243").attr('style','display:none');
	
	$("#IV241").change(function(){
		$("IV242").prop('selectedIndex',0);
		if($("#IV241").val() == 'YES')
		{
			$("#IV243").attr('style','display:block');
			$(".IV243").attr('style','display:block');
			
		}	
		else
		{
			$("#IV243").attr('style','display:none');
			$(".IV243").attr('style','display:none');
		}
	});
	$("#IV242").change(function(){
		
			$("IV241").prop('selectedIndex',0);
			$("#IV243").attr('style','display:none');
			$(".IV243").attr('style','display:none');
		
	});
	
	
	
});