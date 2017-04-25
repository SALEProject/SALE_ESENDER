/********************************************
	Manage placeholder for browser
********************************************/
	/***********************************************************
	Manange change of select type
	************************************************************/
	$(document).ready(function(){
		
		$("select").change(function () {
			// procedure is used for select option where value is same as  name,
			// and for option where is mixed (ex: if we choose IDEM we send # else we show div with info to send)
			//var ele = document.getElementById(selectId);
			var selectedID = $(this).attr('id');
			var ele = document.getElementById(selectedID);
			var items = ele.getElementsByTagName("option");
			for(i=0;i<items.length;i++)
			{
				if(items[i].value != "" && (items[i].id == "" || items[i].id == "#" || items[i].id == "##"))
				{
					// var elem = document.getElementById(items[i].value);
						var id = items[i].value;
						// alert(id);
						
						// alert(id.replace(/\./g,"-"));
						id = id.replace(/\./g,"\\.");
						// alert(id);	
						var elem = document.getElementById(id);
						
					 // alert($("."+id).attr('id'));
					
					if(elem)
					{
						if(elem.style.display == "block")
							elem.style.display = "none";
						
						clearChildren(elem);
					}
					else
					{
						// alert(items[i].value);
						var id = items[i].value;
					// alert(id);
						id = id.replace(/\./g,"\\\.");
						
						var elem = document.getElementById($("."+id).attr('id'));
						
						 // alert($("#"+id).attr('id'));
						
						if(elem)
						{
							if(elem.style.display == "block")
								elem.style.display = "none";
							
							clearChildren(elem);
						}
						else
						{
							alert('Undefined');
						}
					
					}
					
				}	
			}	
			
			if(ele.options[ele.selectedIndex].value == "#")
			{
				
				ele.name = ele.options[ele.selectedIndex].id;
			}
			else 
			{
				if(ele.options[ele.selectedIndex].value == "##")
				{
					ele.name = ele.options[ele.selectedIndex].id;
					var values = ele.name.split("#");
					ele.options[ele.selectedIndex].value = values[2];
				}
				else
				{
					
					if(ele.options[ele.selectedIndex].id != ele.options[ele.selectedIndex].value)
					{
						ele.name = ele.options[ele.selectedIndex].id;
						// var elem = document.getElementById(ele.options[ele.selectedIndex].value);
						var id = ele.options[ele.selectedIndex].value;
						id = id.replace(/\./g,"\\\.");
						//alert(id);	
						var elem = document.getElementById($("#"+id).attr('id'));
						if(elem)
							elem.style.display = "block";
					}
					
					
				}
			}
			
		
		});
	
	});
	
// CLEAR ALL INPUTS ON A DIV
// element is div  - id	
function clearChildren(element) { 

   for (var i = 0; i < element.childNodes.length; i++) { 
      var e = element.childNodes[i]; 
      if (e.tagName) switch (e.tagName.toLowerCase()) { 
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
         default: clearChildren(e); 
      } 
   } 
};

//manage datepicker and date type
/*$(document).ready(function(){
   
    $(document).on('focus','.DATE',function(event){
	
		
		$("input[name="+$(this).attr("name")+"]").datepicker({
		"showAnim": "fold", 
		//dateFormat: "dd/mm/yy",
	    onSelect: function(dateText, inst) {
                    //var startDate = new Date(dateText);
                    //var selDay = startDate.getDay();
                    //alert(selDay);
					
					var date = $(this).datepicker('getDate');
					var month = date.getMonth()+1;
					var year = date.getFullYear();
					var day = date.getDate();
					
					var dateInfo = [day];
					dateInfo.push(month);
					dateInfo.push(year);
					
					var id = $(this).attr('name');
				
					var ids = 	id.split("#");
					var idsLength = dateInfo.length;
				
					for( i=0;i<idsLength;i++)
					{
						// document.getElementById($("#"+ids[i+2]).attr('id')).type = 'hidden';
						$("#"+ids[i+2]).val(dateInfo[i]);
						
					}
					
                 }

		});
				
	});     
   
   // $(".hidden").attr('style','visibility:hidden');
  // $(".hidden").attr('style',function(){
		// alert($(this).attr('name'));
	//	document.getElementById($(this).attr('id')).type = 'hidden';
   //});
   
   // settings for timepicker  	
   
    $(document).on('focus','.TIME',function(event){
		$("#"+$(this).attr("id")+"").timepicker();
	});
  
	$("#frm").submit(function(e){
	
		$(".DATE").val('');
		$(".DATE").clear();
	});	
	
	// used to se date info from database	
});*/


$(document).ready(function(){
    $(".DATE").datepicker({
		showAnim: "fold",
		/*dateFormat: "dd/mm/yy",	    */
	});

	$(".DATE").change(function(){		
		var date = $(this).datepicker('getDate');
		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var day = date.getDate();
				
		var dateInfo = [day];
		dateInfo.push(month);
		dateInfo.push(year);
					
		var id = $(this).attr('name');
				
		var ids = 	id.split("#");
		var idsLength = dateInfo.length;
				
		for( i=0;i<idsLength;i++)
		{
			// document.getElementById($("#"+ids[i+2]).attr('id')).type = 'hidden';
			$("#"+ids[i+2]).val(dateInfo[i]);
						
		}							
	});          
   
   // settings for timepicker  	
   
    $(document).on('focus','.TIME',function(event){	
		$("#"+$(this).attr("id")+"").timepicker();
	});
	
	$(".dispatchDate").datepicker("setDate", new Date());
	$(".dispatchDate").change();
	$(".dispatchDate").attr("disabled", true);
	
	$(".DATE").attr("readonly", true);	
	//$("textarea").css("width", "98%");		
	$("#frm").submit(function(e){
	
		/*$(".DATE").val('');
		$(".DATE").clear();*/
	});	
});