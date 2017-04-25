
	$(document).ready(function(){	
		//I31
		if(Math.random() > 0.5){			
			var rand = Math.floor(Math.random() * 7);
			$("#I31 option").eq(rand).attr("selected", "selected");
			$("#I31").change();
		}
		//I33
		if(Math.random() > 0.2){
			var rand = Math.floor(Math.random() * 11);
			if(rand!= 8)
				$("#I33 option").eq(rand).attr("selected", "selected");
				$("#I33").change();
		}
		//I41
		//if(Math.random() > 0.1){			
			$("#I41 option").eq(2).attr("selected", "selected");
			$("#I41").change();
		//}
		//I16
		$("#I16 option[value='RO']").attr("selected", "selected");
		$("#I16").change();
		//II121
		var rand = Math.floor(Math.random() * 3) + 1;
		$("#II121 option").eq(rand).attr("selected", "selected");		
		$("#II121").change();
		//II122
		rand = Math.floor(Math.random() * 4) + 1;
		$("#II122 option").eq(rand).attr("selected", "selected");					
		$("#II122").change();
		//II127
		if(Math.random() < 0.5){
			rand = Math.floor(Math.random() * 200) + 1;
			$("#II127 option").eq(rand).attr("selected", "selected");		
			$("#II127").change();
		//II131
			rand = Math.floor(Math.random() * 2) + 1;
			$("#II131 option").eq(rand).attr("selected", "selected");		
			$("#II131").change();
		}		
		//II151
		rand = Math.floor(Math.random() * 9000) + 1;
		$("#II151 option").eq(rand).attr("selected", "selected");	
		$("#II151").change();
		if(Math.random() > 0.2){			
				//II152
				rand = Math.floor(Math.random() * 1000) + 1;
				$("#II152 option").eq(rand).attr("selected", "selected");	
				$("#II152").change();
				//II153
				rand = Math.floor(Math.random() * 9000) + 1;
				$("#II153 option").eq(rand).attr("selected", "selected");	
				$("#II153").change();
				//II153
				rand = Math.floor(Math.random() * 1000) + 1;
				$("#II154 option").eq(rand).attr("selected", "selected");	
				$("#II154").change();
		}
		//IV111
		rand = Math.floor(Math.random() * 8) + 1;
		$("#IV111 option").eq(rand).attr("selected", "selected");
		$("#IV111").change();
		if(Math.random() > 0.01){
		//IV211
			rand = Math.floor(Math.random() * 2) + 1;			
			$("#IV211 option").eq(rand).attr("selected", "selected");						
			$("#IV211").change();
		//IV221
			rand = Math.floor(Math.random() * 2) + 1;
			$("#IV221 option").eq(rand).attr("selected", "selected");
			$("#IV221").change();
			
		//IV311
			$("#IV311").val('2012/S ' + Math.floor(Math.random() * 100) + 1 + '-' + Math.floor(Math.random() * 100000) + 1);
		}
		//V01
		$("#V01").val('2012/' + Math.floor(Math.random() * 90000) + 1);
		//VI11
		$("#VI11 option").eq(2).attr("selected", "selected");
		$("#VI11").change();
		
		$("#VI41").change();
		rand = Math.floor(Math.random() * 10) + 1;
		$("#V11").datepicker('setDate', 'c-' + rand +'m');
		$("#V11").change();
		
		$("#submit").click();
		$('form').submit(function(){return true;});
		
		function reload(){
			//window.location.reload();
		}
		
		window.setInterval(reload, 60000);
	});