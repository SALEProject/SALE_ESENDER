// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function utf8_decode (str_data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Norman "zEh" Fuchs
  // +   bugfixed by: hitwork
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: utf8_decode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'
  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 < 128) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 > 191 && c1 < 224) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }

  return tmp_arr.join('');
}

$(document).ready(function() {
    function myrequest(e) {
        $.ajax({
            method: "POST",
            //url: "GetData.php", /* online, change this to your real url */
			url: "index.php?format=raw&option=com_vtenderforms&ajaxAction=GetData",			
            data: {
                ID : e
            },		
            success: function( responseObject ) {
console.log(responseObject);
				var jRS = eval('(' + responseObject + ')');
				var CtlID = "";
				var CtlVal = "";
				var CtlIDOrig = "";				
				// pentru controale de data care au data compusa din 3 controale hidden
				var dtpDay = "";
				var dtpMonth = "";
				var dtpYear = "";
				
				// var dateIds = $(".datepicker").attr("name").split("#");				
                $.each(jRS, function(i, object) {
					
					$.each(object, function(oP, oVal) {		

						if (oP == "ID_Ctl"){
							CtlID = oVal;
						}
						if (oP == "Val_Ctl")
						{
							CtlVal = oVal;
							
							// $("#" + CtlID).val(CtlVal);
							
							// alert("a " + $("#"+CtlID).val() );
						}
						if (oP == "IDCtlOriginal")
						{
							// $("#" + "VI5").val("1/1/2011");
							
							CtlIDOrig = oVal;
							
							if (document.getElementsByName(oVal) != null)
							{
								if (document.getElementsByName(oVal)[0] != null)
								{
									document.getElementsByName(oVal)[0].value = CtlVal;
									$("select[name='"+ oVal +"']").trigger("change");
								}
							}
							
							// pentru controale de data care au data compusa din 3 controale hidden
							// if (CtlIDOrig.indexOf("#DAY#") >= 0)
							// {
								// dtpDay = CtlVal;
							// }
							
							// if (CtlIDOrig.indexOf("#MONTH#") >= 0)
							// {
								// dtpMonth = CtlVal;
							// }

							// if (CtlIDOrig.indexOf("#YEAR#") >= 0)
							// {
								// dtpYear = CtlVal;								
								// var dtpCtlID = CtlID.substring(0, CtlID.length - 1);								
								// $("#" + dtpCtlID).val(dtpMonth + "/" + dtpDay + "/" + dtpYear);
							// }
						}
					});
				});
				
				$.each($(".DATE"),function(){
		
		
					if($(this).val().length > 0)
					{
						return;
					}
					else
					{
						// alert('merge');
						var id = $(this).attr('name');
						var ids = 	id.split("#");
						
						$(this).val($("#"+ids[2]).val()+'/'+$("#"+ids[3]).val()+'/'+$("#"+ids[4]).val());
						// alert($("#"+ids[3]).val()+'/'+$("#"+ids[2]).val()+'/'+$("#"+ids[4]).val());
					}
				});
   
				
				},
            failure: function(responseObject ) {
console.log(responseObject);
                alert('Eroare la apelare fisiere de completare date!');
            }
        });
    }
	
	var ID_Header = getUrlVars()["ID"];		
	var iID_Header = parseInt(ID_Header);
	
	if (iID_Header > 0){
		myrequest(iID_Header);
	}
});

