
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
flower_map_front[3] = "images/flowerpower/aster.jpg";
flower_map_front[4] = "images/flowerpower/BirdsOfParadise.jpg";
flower_map_front[5] = "images/flowerpower/BirdsOfParadise.jpg";
flower_map_front[6] = "images/flowerpower/BirdsOfParadise.jpg";

var flower_map_back = new Array();
flower_map_back[0] = "alstroemeria";
flower_map_back[1] = "anthurium";
flower_map_back[2] = "anthurium";
flower_map_back[3] = "anthurium";
flower_map_back[4] = "anthurium";
flower_map_back[5] = "anthurium";
flower_map_back[6] = "anthurium";

var flip_template = "<div class=\"col-xs-6 col-md-4 flip-container\" ontouchstart=\"this.classList.toggle('hover');\" class=\"image_tile\"> <div class=\"flipper\"> <div class=\"front\"><img src='<!-- front content -->'/></div> <div class=\"back\"> <a href='#' onclick=\"displaymodal('<!-- back content -->')\">Read more</a> </div></div></div>";
var row_template = "<div class=\"row\">";
//var wiki_url_template = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles={title}&prop=revisions&rvprop=content"


function populateDiv(element) {
	for (i = 0; i < flower_map_front.length; i++) {
		if (i%3==0) {
			element.innerHTML += row_template;
		}

		result = flip_template.replace('<!-- front content -->', flower_map_front[i]);

		

		// $.post( wiki_url, {}, function( data ) {
		//     console.log( JSON.stingify(data) ); 
		// }, "json");


		result = result.replace('<!-- back content -->', flower_map_back[i]);

		element.innerHTML += result;

		if (i%3==2) {
			element.innerHTML += "</div>"
		}
	}
}

function displaymodal(title) {
	
	var wiki_url_template = "http://en.wikipedia.org/w/api.php?action=parse&page={title}&format=json&prop=text&section=0";

	wiki_url = wiki_url_template.replace('{title}',title) + "&callback=?";

	$.getJSON(wiki_url, function(data){
		    get_content_from_JSON(data);
		    //console.log("title:" + localStorage.getItem("title"));
		    console.log("*:" + localStorage.getItem("*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, ''));
		});

	wiki_output = localStorage.getItem("*").replace(/<(?:.|\n)*?>/gm, '');

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

function get_content_from_JSON(JSON_object){
	get_keyval_JSON(JSON_object, "title");
	get_keyval_JSON(JSON_object, "*");

}

function get_keyval_JSON(obj, return_key) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if ("object" == typeof(obj[key])) {
				get_keyval_JSON(obj[key], return_key);
			} else {
				//console.log('key:'+ key);
				//console.log('value:'+ obj[key]);
				if (key == return_key) {
					if (obj[key] != "undefined") {
						localStorage.setItem(return_key, obj[key]);	
					}
				}
			}
		}
	}
}
