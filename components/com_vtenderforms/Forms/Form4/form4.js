	$(document).ready(function(){
		$(".date").datepicker({
			changeMonth: true,
            changeYear: true,
			dateFormat: "dd-mm-yy",
			showOn: "button",
            buttonImage: "../../images/calendar.gif",
            buttonImageOnly: true
		});
		
		
	//-----------------------DATE------------------------------//
		$(".date").change(function(){
			var dateID = this.id;
			if(dateID.indexOf("VI41")>= 0)
				$('#VI41').datepicker('setDate', new Date());
			var date = this.value;
			var parts = date.split("-");
			var day = parts[0];
			var month = parts[1];
			var year =  parts[2];

			$('input[type="hidden"]').each(function(){
				var childID = this.id;
				var childName = this.name;
				if(childName.indexOf(dateID + "_")>= 0){
					if(childName.toUpperCase().indexOf("DAY")>= 0)
						$("#" + childID).attr("value", day);
						
					if(childName.toUpperCase().indexOf("MONTH")>= 0)
						$("#" + childID).attr("value", month);
						
					if(childName.toUpperCase().indexOf("YEAR")>= 0)
						$("#" + childID).attr("value", year);
				}				
			});		
		});
	//------------------------------------------------------------------//
		
		
		//--------------------------------I41---------------------------			
		$('#I41').change(function(){
			if(($('#I41 option:selected').text().indexOf("YES") >= 0) || ($('#I41 option:selected').text().indexOf("Yes") >= 0)){
				$("#A").show();
			}else{
				clearChildren(document.getElementById('A'));
				$("#A").hide();
			}
		});
		//---------------------------------------------------------------
		
		//-----------II-----------------------------
		$('#II121').change(function() {
		  clearChildren(document.getElementById('II.1.2.2'));
		  clearChildren(document.getElementById('II.1.2.3'));
		  clearChildren(document.getElementById('II.1.2.4'));
		  clearChildren(document.getElementById('II.1.2.5'));
		  if($(this).val().indexOf('WORKS')>= 0){			
			$('#II\\.1\\.2\\.3').show();		
			$('#II\\.1\\.2\\.2').hide();
			$('#II\\.1\\.2\\.4').hide();		
			$('#II\\.1\\.2\\.5').hide();					
			$('#D21').prop("disabled", true);
			$('#D201').prop("disabled", true);
		  }
		  if($(this).val().indexOf('SUPPLIES')>= 0){
			$('#II\\.1\\.2\\.2').show();		
			$('#II\\.1\\.2\\.3').hide();
			$('#II\\.1\\.2\\.4').hide();		
			$('#II\\.1\\.2\\.5').hide();	
			$('#D21').prop("disabled", false);
			$('#D201').prop("disabled", false);
		  }
		  if($(this).val().indexOf('SERVICES')>= 0){
			$('#II\\.1\\.2\\.4').show();		
			$('#II\\.1\\.2\\.3').hide();
			$('#II\\.1\\.2\\.2').hide();		
			$('#II\\.1\\.2\\.5').hide();		
			$('#D21').prop("disabled", true);
			$('#D201').prop("disabled", true);
		  }
		});
		//---------------------------------------------------------------
		
		//-----------------------II.1.2.4--------------------------------
		$('#II124').change(function() {
			if($(this).val() > 16)
				$('#II\\.1\\.2\\.5').show();	
			else
				{
					clearChildren(document.getElementById('II.1.2.5'));
					$('#II\\.1\\.2\\.5').hide();
				}
		});
		//---------------------------------------------------------------
		
		//-----------------------II.2------------------------------------
		//$('#II\\.2\\.1').replaceWith('<h3><a href="#">First header</a></h3>');
		//$('#II\\.2\\.2').replaceWith('<h3><a href="#">Second header</a></h3>');
		//$('#II\\.2\\.1').prepand('<h3><a href="#">First header</a></h3>');
		//$('#II\\.2\\.2').prepand('<h3><a href="#">Second header</a></h3>');
		//$('#II\\.2').accordion();
		$('#II\\.2 .formSectionSubTitle').insertBefore('#II\\.2');		
		$('#II\\.2\\.1').find('div').first().remove();
		$('#II\\.2\\.2').find('div').first().remove();
		$('<h3><a href="#">Fix Value</a></h3>').insertBefore('#II\\.2\\.1');
		$('<h3><a href="#">Estimated Value</a></h3>').insertBefore('#II\\.2\\.2');
		$('#II\\.2').accordion();
		$('#II\\.2').bind('accordionchangestart', function(event, ui) {
		  clearChildren(document.getElementById('II.2'));
		});
		
		$("#II212, #II213, #II214").prop('disabled', true);
		
		$('#II211').change(function(){
			if($(this).val()!= "")
				$("#II212, #II213").prop("disabled", false);
			else{
				$("#II212, #II213, #II214").val("");
				$("#II212, #II213, #II214").prop('disabled', true);
			}			
		});
		
		$("#II213").change(function(){
			if($("#II213 option:selected").text().indexOf("Including")>= 0)
				$("#II214").prop("disabled", false);
			else{
				$("#II214").val("");
				$("#II214").prop("disabled", true);
			}
		});
		
		$("#II216, #II217, #II218, #II219").prop("disabled", true);
		$("#II215").change(function(){
			if($(this).val()!= "")
				$("#II216, #II217, #II218").prop("disabled", false);
			else{
				$("#II216, #II217, #II218, #II219").val("");
				$("#II216, #II217, #II218, #II219").prop("disabled", true);
			}
		});
		$("#II218").change(function(){
			if($("#II218 option:selected").text().indexOf("Including")>= 0)
				$("#II219").prop("disabled", false);
			else{
				$("#II219").val("");
				$("#II219").prop("disabled", true);
			}
		});
		
		$("#IV321").change(function(){
			if($("#IV321 option:selected").text().indexOf("YES")>= 0)
				$("#IV\\.3\\.2\\.1").show();
			else{
				clearChildren(document.getElementById('IV.3.2.1'));
				$("#IV\\.3\\.2\\.1").hide();
				$("#IV\\.3\\.2\\.1\\.1\\.1").hide();
				$("#IV\\.3\\.2\\.1\\.2\\.1").hide();
				$("#IV\\.3\\.2\\.1\\.3\\.1").hide();
				$("#IV\\.3\\.2\\.1\\.4\\.1").hide();
			}
				//$("#IV\\.3\\.2\\.1\\.1").toogle();
		});

		$("#IV111").change(function(){
			var IV111 = $("#IV111 option:selected").text();
			var I41 = $('#I41 option:selected').text();
			if(((I41.indexOf("YES")>= 0) || (I41.indexOf("Yes")>= 0)) && (IV111.indexOf("Negotiated without")>= 0) ){
				$("#D").show();
				clearChildren(document.getElementById('D.1'));
				$("#D\\.1").hide();
				$("#D\\.2").show();
			}else if(((I41.indexOf("YES")>= 0) || (I41.indexOf("Yes")>= 0)) && (IV111.indexOf("Award")>= 0) ){			
				$("#D").show();
				clearChildren(document.getElementById('D.2'));
				$("#D\\.2").hide();
				$("#D\\.1").show();
			}else{
				clearChildren(document.getElementById('D'));
				clearChildren(document.getElementById('D.1'));
				clearChildren(document.getElementById('D.2'));
				$("#D").hide();
				$("#D\\.1").hide();
				$("#D\\.2").hide();
			}
		});
		
		//--------------------------V11--------------------------------------
		$("#V11").change(function(){
			var day = $(this).datepicker("getDate").getDate() + 1;
			var month = $(this).datepicker("getDate").getMonth();
			var year = $(this).datepicker("getDate").getFullYear();
			var x = new Date(year, month, day);
			$("#VI41").datepicker( "option", "minDate",x );
		});
		//-------------------------------------------------------------------
		
		//-----------------------V.4.1---------------------------------------
		$("#V42, #V43, #V44").prop("disabled", true);
		$("#V41").change(function(){			
			if($(this).val() > 0)
				$("#V42, #V43").prop("disabled", false);
			else{
				$("#V42").val("");
				$("#V43").val("");
				$("#V44").val("");
				$("#V42, #V43, #V44").prop("disabled", true);
			}
		});
		$("#V43").change(function(){
			if($("#V43 option:selected").text().indexOf("Including") >= 0)
				$("#V44").prop("disabled", false);
			else{
				$("#V44").prop("disabled", true);
				$("#V44").val("");
			}
				
		});
		//-------------------------------------------------------------------				
		
		//----------------------V.4.2----------------------------------------
		//$('#V\\.4\\.2, #V\\.4\\.3').wrapAll('<div id="V.4.2.0" />');
		$('#V\\.4\\.2').find('div').first().remove();
		$('#V\\.4\\.2\\.1').find('div').first().remove();
		$('#V\\.4\\.2\\.2').find('div').first().remove();
		$('<h3><a href="#">Fix Value</a></h3>').insertBefore('#V\\.4\\.2\\.1');
		$('<h3><a href="#">Estimated Value</a></h3>').insertBefore('#V\\.4\\.2\\.2');
		$('#V\\.4\\.2').accordion();
		$('#V\\.4\\.2').bind('accordionchangestart', function(event, ui) {
		  clearChildren(document.getElementById('V.4.2'));
		});
		
		$("#V46, #V47, #V48").prop("disabled", true);
		$("#V45").change(function(){
			if($(this).val() > 0){
				$("#V46, #V47").prop("disabled", false);
			}else{
				$('#V46').val("");
				$('#V47').val("");
				$('#V48').val("");
				$("#V46, #V47").prop("disabled", true);
			}
		});
		$("#V47").change(function(){
			if($("#V47 option:selected").text().indexOf("Including")>= 0){
				$("#V48").prop("disabled", false);
			}
			else{
				$("#V48").val("");
				$("#V48").prop("disabled", true);
			}			
		});
		
		$("#V410, #V411, #V412, #V413").prop("disabled", true);
		$("#V49").change(function(){
			if($(this).val() > 0){
				$("#V410, #V411, #V412").prop("disabled", false);
			}
			else{				
				$('#V410').val("");
				$('#V411').val("");
				$('#V412').val("");
				$('#V413').val("");
				$("#V410, #V411, #V412, #413").prop("disabled", true);
			}
		});
		$("#V412").change(function(){
			if($("#V412 option:selected").text().indexOf("Including") >= 0){
				$("#V413").prop("disabled", false);
			}
			else{
				$("#V413").val("");
				$("#V413").prop("disabled", true);
			}
		});
		
		$("#V414").change(function(){
			if($(this).val()!= "")
				$("#V415").prop("disabled", true);
			else
				$("#V415").prop("disabled", false);
		});
		
		$("#V415").change(function(){
			if($(this).val()!= "")
				$("#V414").prop("disabled", true);
			else
				$("#V414").prop("disabled", false);
		});
		//-------------------------------------------------------------------
		
		//------------------------------V.5----------------------------------
		$("#V52, #V53, #V54, #V55, #V56").prop("disabled", true);
		$("#V51").change(function(){
			if(($("#V51 option:selected").text().indexOf("NO") >=0) || ($("#V51 option:selected").text().indexOf("No") >=0)){
				$("#V52, #V53, #V54, #V55, #V56").val("");
				$("#V52, #V53, #V54, #V55, #V56").prop("disabled", true);
			}else{
				$("#V52, #V54, #V55, #V56").prop("disabled", false);
				/*if($("#V54").val() == ""){
					if($("#V55").val() == "")
						$("#V52").prop("disabled", false);					
					if($("#V54").val() == "")
						
				}*/
			}
		});			
		$("#V52").change(function(){
			if($(this).val() > 0){
				$("#V53").prop("disabled", false);
				$("#V54, #V55").prop("disabled", true);
			}
			else{
				$("#V53").val("");
				$("#V53").prop("disabled", true);				
				$("#V54, #V55").prop("disabled", false);
			}
		});
		$("#V54, #V55").change(function(){
			var id = (this.id.indexOf("V54")>= 0)?"V55":"V54";
			if($(this).val()!= ""){
				$("#V52").val("");
				$("#V52").prop("disabled", true);				
				$("#" + id).prop("disabled", true);
			}else{
				if($("#V54, #V55").val() =="")
					$("#V52").prop("disabled", false);
				$("#" + id).prop("disabled", false);
			}
		});
		$("#V55").change(function(){
			if($("#V55 option:selected").text()!= ""){
				$("#V56").val("");
				$("#V56").prop("disabled", true);
			}else{
				$("#V56").prop("disabled", false);
			}				
		});		
		//-------------------------------------------------------------------
		
		//------------------------------VI.1----------------------------------
		$("#VI11").change(function(){
			if($("#VI11 option:selected").text()!= ""){
				$("#VI12").prop("disabled", true);
				$("#VI12").val("");
			}else{														
				$("#VI12").prop("disabled", false);
			}
		});		
		//-------------------------------------------------------------------
		
		//--------------------------VI4--------------------------------------
		$("#VI41").change(function(){
			var day = $(this).datepicker("getDate").getDate() - 1;
			var month = $(this).datepicker("getDate").getMonth();
			var year = $(this).datepicker("getDate").getFullYear();
			var x = new Date(year, month, day);
			$("#V11").datepicker( "option", "maxDate",x );
		});
		//-------------------------------------------------------------------			
		
		$("#D111").change(function(){			
			if(($("#D111 option:selected").text().indexOf("Yes")>= 0) || ($("#D111 option:selected").text().indexOf("YES")>= 0))
			{			
				$("#D121 option[value='NO']").attr('selected', 'selected');
				$("#D121").prop("disabled", true);
			}else{
				$("#D121").prop("disabled", false);
			}
		});
		
		$("#D121").change(function(){
			if(($("#D121 option:selected").text().indexOf("Yes")>= 0) || ($("#D121 option:selected").text().indexOf("YES")>= 0))		
			{
				$("#D111 option[value='NO']").attr('selected', 'selected');				
				$("#D111").prop("disabled", true);
			}else{
				$("#D111").prop("disabled", false);
			}
		});
		
		$("#D224").change(function(){			
			if(($("#D224 option:selected").text().indexOf("Yes")>= 0) || ($("#D224 option:selected").text().indexOf("YES")>= 0))
			{			
				$("#D225 option[value='NO']").attr('selected', 'selected');
				$("#D225").prop("disabled", true);
			}else{
				$("#D225").prop("disabled", false);
			}
		});
		
		$("#D225").change(function(){
			if(($("#D225 option:selected").text().indexOf("Yes")>= 0) || ($("#D225 option:selected").text().indexOf("YES")>= 0))		
			{
				$("#D224 option[value='NO']").attr('selected', 'selected');				
				$("#D224").prop("disabled", true);
			}else{
				$("#D224").prop("disabled", false);
			}
		});
		
		function hideD21D201(){
		$('#D\\.1, #D\\.2').each(function(){
			if($(this).is(':visible')){
				if($("#II121 option:selected").text().indexOf("SUPPLIES")>= 0)
					$("#D21, #D201").prop("disabled", true);
				else
					$("#D21, #D201").prop("disabled", false);
			}
			});
		} //foo()
		
		window.setInterval(hideD21D201, 100);				
	});