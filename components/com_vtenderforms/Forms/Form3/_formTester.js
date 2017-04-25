
	$(document).ready(function(){
		var i = 1;

		$("input, select, textarea").each(function(){			
			var tagName = $(this).prop("tagName");			
			var n = 0;
			if($(this).attr("id") == "II151")
				n = 3234;
			switch(tagName){
				case "INPUT":
					var type = $(this).attr("type");
					var date = $(this).hasClass("DATE");
					var hidden = false;
					var inputClass = "";
					if($(this).hasClass("URL")) inputClass = "URL";
					if($(this).hasClass("FAX")) inputClass = "FAX";
					if($(this).hasClass("PHONE")) inputClass = "PHONE";
					if($(this).hasClass("EMAIL")) inputClass = "EMAIL";
					if($(this).hasClass("HIDDEN")) inputClass = "HIDDEN";
					
					var parent = $(this).closest("div");
					
					var k = 0;
					while(!hidden){
						var cucu;
						if(($(this).attr("id") == "II211") || ($(this).attr("id") == "radioDiv_1_II.2.1"))
							cucu++;
						k++;
						if (k > 5)
							break;						
						
						var attr = parent.css('display');
						var tg = parent.prop("tagName");

						// For some browsers, `attr` is undefined; for others,
						// `attr` is false.  Check for both.
						if (typeof attr !== 'undefined' && attr !== false && attr == "none") 							
							hidden = true;
						else	
							parent = parent.closest("div");						
							
						var id = parent.attr("id");
						//if(typeof id!== 'undefined'){
						if((typeof id !== 'undefined') && (id.length > 0))						
							break;
					}
																		
					
					if((hidden) || (type.toUpperCase() == "HIDDEN") || (inputClass.toUpperCase() == "HIDDEN"))
						break;										
										
					if(type.toUpperCase() == "RADIO"){
						var name = $(this).attr("name");
						var j = 0;
						$("input[name='"+name+"']").each(function(){
							j++;
						});
						
						var rand = Math.floor(Math.random()*(j)) + 1;
						
						$("input[name='"+name+"']:nth-child("+rand+")").attr("checked", "checked");	
						$("input[name='"+name+"']:nth-child("+rand+")").change();
						$(this).change();
					}
					
					//if(hidden)						
						//break;					
										
					var attr = $(this).attr('disabled');

					// For some browsers, `attr` is undefined; for others,
					// `attr` is false.  Check for both.
					if (typeof attr !== 'undefined' && attr !== false) {
						break;
					}

					if(date){
						$(this).datepicker("setDate", new Date());
						$(this).change();
						break;
					}									
					
					switch(inputClass){
						case "URL": $(this).val("www." + i + ".com"); break;
						case "FAX": $(this).val("+40 12345678"); break;
						case "PHONE": $(this).val("+40 12345678"); break;
						case "EMAIL": $(this).val("a" + i +"@a.com"); break;
						default: $(this).val(i);
					}					
					
					$(this).change();
					i++;
					
				break;
				
				case "SELECT":	
					var attr = $(this).attr('disabled');

					// For some browsers, `attr` is undefined; for others,
					// `attr` is false.  Check for both.
					if (typeof attr !== 'undefined' && attr !== false) 
						break;
					
				
					var nrOptions = $("option", this).size();
					var rand = Math.floor(Math.random()*(nrOptions)) + 1;
					$("option:eq("+rand+")", this).prop("selected", true);
					$(this).change();
				break;
				
				case "TEXTAREA":
					var attr = $(this).attr('disabled');

					// For some browsers, `attr` is undefined; for others,
					// `attr` is false.  Check for both.
					if (typeof attr !== 'undefined' && attr !== false) {
						break;
					}
					
					$(this).val(i);		
					$(this).change();	
					i++;
				break;
			}
		});		
	});