
function animationClick(element, animation){
	if ($('.container #pageUpContent').length )
	{
		if( element_byId.style.display == "none")
		{
			element_byId.style.display = "block";
		}
		else
		{
			element_byId.style.display = "none";
		}
		/*$('.container #pageUpContent').remove;*/
	}
	else
	{
		element_byId = document.getElementById(element);
		populateDiv(element_byId);
		element_byId.style.display = "block";
		element = $("#"+element);
		    element.addClass('animated ' + animation);         
		    //wait for animation to finish before removing classes
		    window.setTimeout( function(){
		        element.removeClass('animated ' + animation);
		    }, 2000);     
		$('.container').append(element);
	}

    
}


var flower_map_front = new Array();
flower_map_front[0] = "images/flowerpower/alstroemeria.jpg";
flower_map_front[1] = "images/flowerpower/anthurium.jpg";
flower_map_front[2] = "images/flowerpower/aster.jpg";
flower_map_front[3] = "images/flowerpower/sunflower.jpg";
flower_map_front[4] = "images/flowerpower/Bouvardia.jpg";
flower_map_front[5] = "images/flowerpower/Calla.jpg";
flower_map_front[6] = "images/flowerpower/carnation.jpg";

var flower_map_back = new Array();
flower_map_back[0] = "alstroemeria";
flower_map_back[1] = "anthurium";
flower_map_back[2] = "aster";
flower_map_back[3] = "sunflower";
flower_map_back[4] = "Bouvardia";
flower_map_back[5] = "Calla";
flower_map_back[6] = "carnation";

var flip_template = "<div class=\"col-xs-6 col-md-4 flip-container\" ontouchstart=\"this.classList.toggle('hover');\" class=\"image_tile\"> <div class=\"flipper\"> <div class=\"front\"><img src='<!-- front content -->'/></div> <div class=\"back\"> <div id='back_content'><h3>{flower_map_back}</h3><p>{flower_back_content}</p><a href='#' onclick=\"displaymodal('{flower_map_back}')\">Read more</a> </div></div></div></div>";
var row_template = "<div class=\"row\">";
//var wiki_url_template = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles={title}&prop=revisions&rvprop=content"


function check_local_storage() {
	for(i = 0; i < flower_map_back.length; i++) {
		if(localStorage.getItem(flower_map_back[i]+"_*") == null) {
			console.log(localStorage.getItem(flower_map_back[i]+"_*"));
			return false;
		}
	}
	return true;
}

$( document ).ready(function() {
	for (i = 0; i < flower_map_back.length; i++) {
		set_flower_metadata(flower_map_back[i]);
		console.log("fetching: " + flower_map_back[i]);
	}
});

function populateDiv(element) {

//*

	for (i = 0; i < flower_map_front.length; i++) {
		if (i%3==0) {
			element.innerHTML += row_template;
		}

		result = flip_template.replace('<!-- front content -->', flower_map_front[i]);

		
		result = result.replace('{flower_map_back}', flower_map_back[i]);
		result = result.replace('{flower_map_back}', flower_map_back[i]);
		console.log("grabbing from localStorage: " + flower_map_back[i]);
		wiki_output = localStorage.getItem(flower_map_back[i]+"_*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, '');
	

		wiki_output = wiki_output.replace('This article needs additional citations for verification. Please help improve this article by adding citations to reliable sources. Unsourced material may be challenged and removed.', '');

		result = result.replace('{flower_back_content}', wiki_output.substring(0,100));

		element.innerHTML += result;

		if (i%3==2) {
			element.innerHTML += "</div>"
		}
	}

}
//*/

function displaymodal(title) {
	
	wiki_output = localStorage.getItem(title+"_*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, '');
	
	wiki_output = wiki_output.replace('This article needs additional citations for verification. Please help improve this article by adding citations to reliable sources. Unsourced material may be challenged and removed.', '');

	bootbox.dialog({
            message: wiki_output,
            title: title,
              buttons: {
                main: {
                  label: "Acknowledge",
                  className: "btn-primary",
                }
              }
        });
}

function set_flower_metadata(title) {

	var wiki_url_template = "http://en.wikipedia.org/w/api.php?action=parse&page={title}&format=json&prop=text&section=0";

	wiki_url = wiki_url_template.replace('{title}',title) + "&callback=?";

	$.getJSON(wiki_url, function(data){
		    set_content_from_JSON(data, title);
		    //console.log("title:" + localStorage.getItem("title"));
		    //console.log("*:" + localStorage.getItem("*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, ''));
		    
	});
}

function set_content_from_JSON(JSON_object, title){
	set_keyval_JSON(JSON_object, title, "title");
	set_keyval_JSON(JSON_object, title, "*");

}

function set_keyval_JSON(obj, title, return_key) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if ("object" == typeof(obj[key])) {
				set_keyval_JSON(obj[key], title, return_key);
			} else {
				//console.log('key:'+ key);
				//console.log('value:'+ obj[key]);
				if (key == return_key) {
					if (obj[key] != "undefined") {
						localStorage.setItem(title + "_" + key, obj[key]);
						break;
					}
				}
			}
		}
	}
}
