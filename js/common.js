
//Animation for div to go up and down, expects element and animation type as arguments

function animationClick(element, animation){

	//checking if container has the element pageUpContent
	if ($('.container #pageUpContent').length) {
		//if the element is hidden execute this block
		if( element_byId.style.display == "none") {
			//display element
			element_byId.style.display = "block";
			//set element to jQuery DOM object instead of the name of the #id
			element = $("#"+element);
			//add animation class
		    element.addClass('animated ' + animation);         
		    //wait for animation to finish before removing classes
		    window.setTimeout( function(){
		        element.removeClass('animated ' + animation);
		    }, 2000);     
		
		} else {
			//hide element
			element_byId.style.display = "none";
		}
		/*$('.container #pageUpContent').remove;*/
	} else { // if pageUpContent doesn't exist in container,
		// set elemnt by #id to native JavaScript DOM Object
		element_byId = document.getElementById(element);
		// populate the div with content
		populateDiv(element_byId);
		// display the div
		element_byId.style.display = "block";
		// set element to jQuery DOM object
		element = $("#"+element);
		    element.addClass('animated ' + animation);         
		    //wait for animation to finish before removing classes
		    window.setTimeout( function(){
		        element.removeClass('animated ' + animation);
		    }, 2000);
		// add element to the container     
		$('.container').append(element);
	}

    
}

// declaring and instantiating the list for the flower images
var flower_map_front = new Array();
flower_map_front.push("images/flowerpower/alstroemeria.jpg");
flower_map_front.push("images/flowerpower/anthurium.jpg");
flower_map_front.push("images/flowerpower/aster.jpg");
flower_map_front.push("images/flowerpower/sunflower.jpg");
flower_map_front.push("images/flowerpower/Bouvardia.jpg");
flower_map_front.push("images/flowerpower/Calla.jpg");
flower_map_front.push("images/flowerpower/carnation.jpg");
//flower_map_front[7] = "images/flowerpower/chrysanthemum.jpg";
flower_map_front.push("images/flowerpower/daffodil.jpg");
flower_map_front.push("images/flowerpower/delphinium.jpg");
flower_map_front.push( "images/flowerpower/freesia.jpg");
flower_map_front.push("images/flowerpower/gerbera.jpg");
//flower_map_front[12] = "images/flowerpower/glysophilia.jpg";
flower_map_front.push("images/flowerpower/heather.jpg");
flower_map_front.push("images/flowerpower/hydrangea.jpg");
flower_map_front.push("images/flowerpower/Iris.jpg");
flower_map_front.push("images/flowerpower/liatris.jpg");
//flower_map_front[17] = "images/flowerpower/lily.jpg";
//flower_map_front[18] = "images/flowerpower/lilyOfTheValley.jpg";
flower_map_front.push("images/flowerpower/lisianthus.jpg");
//flower_map_front[20] = "images/flowerpower/orchid.jpg";
flower_map_front.push("images/flowerpower/rose.jpg");
flower_map_front.push("images/flowerpower/snapdragon.jpg");
flower_map_front.push("images/flowerpower/statice.jpg");
flower_map_front.push("images/flowerpower/sunflower.jpg");
flower_map_front.push("images/flowerpower/tulip.jpg");

// the map for the flower queries to Wiki API
var flower_map_back = new Array();
flower_map_back.push("alstroemeria");
flower_map_back.push("anthurium");
flower_map_back.push("aster");
flower_map_back.push("sunflower");
flower_map_back.push("Bouvardia");
flower_map_back.push("Calla");
flower_map_back.push("carnation");
//flower_map_back[7] = "chrysanthemum";
flower_map_back.push("daffodil");
flower_map_back.push("delphinium");
flower_map_back.push("freesia");
flower_map_back.push("gerbera");
//flower_map_back[12] = "glysophilia";
flower_map_back.push("heather");
flower_map_back.push("hydrangea");
flower_map_back.push("Iris");
flower_map_back.push("liatris");
//flower_map_back[17] = "lily";
//flower_map_back[18] = "lilyOfTheValley";
flower_map_back.push("lisianthus");
//flower_map_back[20] = "orchid";
flower_map_back.push("rose");
flower_map_back.push("snapdragon");
flower_map_back.push("statice");
flower_map_back.push("sunflower");
flower_map_back.push("tulip");
// templates for the flip div
var flip_template = "<div class=\"col-xs-6 col-md-4 flip-container\" ontouchstart=\"this.classList.toggle('hover');\" class=\"image_tile\"> <div class=\"flipper\"> <div class=\"front\"><img class=\"img-rounded img-responsive\" src='<!-- front content -->'/></div> <div class=\"back\"> <div id='back_content'><h3>{flower_map_back}</h3><p>{flower_back_content}</p><a href='#' onclick=\"displaymodal('{flower_map_back}')\">Read more</a> </div></div></div></div>";
// template to create a new row
var row_template = "<div class=\"row\">";
//var wiki_url_template = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles={title}&prop=revisions&rvprop=content"

// check localstorage for objects
function check_local_storage() {
	for(i = 0; i < flower_map_back.length; i++) {
		if(localStorage.getItem(flower_map_back[i]+"_*") == null) {
			console.log(localStorage.getItem(flower_map_back[i]+"_*"));
			return false;
		}
	}
	return true;
}
// when the document is ready get flower metadata
$( document ).ready(function() {
	for (i = 0; i < flower_map_back.length; i++) {
		set_flower_metadata(flower_map_back[i]);
		console.log("fetching: " + flower_map_back[i]);
	}
});
// populates the element with the content from wiki using the array specified above
function populateDiv(element) {

//*

	for (i = 0; i < flower_map_front.length; i++) {
		// if (i%6==0) {
		// 	element.innerHTML += row_template;
		// }
		// // replacing things in template
		result = flip_template.replace('<!-- front content -->', flower_map_front[i]);

		
		result = result.replace('{flower_map_back}', flower_map_back[i]);
		result = result.replace('{flower_map_back}', flower_map_back[i]);
		console.log("grabbing from localStorage: " + flower_map_back[i]);
		// get item from localstorage for flower in list and store in wiki_output
		wiki_output = localStorage.getItem(flower_map_back[i]+"_*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, '');
	
		// replacing junk metadata from wikipedia
		wiki_output = wiki_output.replace('This article needs additional citations for verification. Please help improve this article by adding citations to reliable sources. Unsourced material may be challenged and removed.', '');
		// injecting wiki output in place of flower back content
		result = result.replace('{flower_back_content}', wiki_output.substring(0,100));
		// assigning reult to innerHTML
		element.innerHTML += result;
		// creating rows originatio
		// if (i%3==2) {
		// 	element.innerHTML += "</div>"
		// }
	}

}
//*/
// this function displays content using bootbox
function displaymodal(title) {
	
	wiki_output = localStorage.getItem(title+"_*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, '');
	
	wiki_output = wiki_output.replace('This article needs additional citations for verification. Please help improve this article by adding citations to reliable sources. Unsourced material may be challenged and removed.', '');
	// bootbox object 
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
// set flower metadata to local storage
function set_flower_metadata(title) {
	// base template for constructing URL for API
	var wiki_url_template = "http://en.wikipedia.org/w/api.php?action=parse&page={title}&format=json&prop=text&section=0";
	// setting title to argument and adding callback option
	wiki_url = wiki_url_template.replace('{title}',title) + "&callback=?";
	// callback API from wiki
	$.getJSON(wiki_url, function(data){
		    set_content_from_JSON(data, title);
		    //console.log("title:" + localStorage.getItem("title"));
		    //console.log("*:" + localStorage.getItem("*").replace(/<(?:.|\n)*?>/gm, '').replace(/^\s*[\r\n]/gm, ''));
		    
	});
}
// set the title and metadata
function set_content_from_JSON(JSON_object, title){
	//set_keyval_JSON(JSON_object, title, "title");
	set_keyval_JSON(JSON_object, title, "*");

}
// recursively get metadata
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
