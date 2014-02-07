function animationClick(element, animation){
	element_byId = document.getElementById(element);
	populateDiv(element_byId);
	element_byId.style.display = "block";
    element = $("#"+element);

            element.addClass('animated ' + animation);         
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);          

}

var flower_map_front = new Array();
flower_map_front[0] = "images/flowerpower/alstroemeria.jpg";
flower_map_front[1] = "images/flowerpower/anthurium.jpg";
flower_map_front[2] = "images/flowerpower/aster.jpg";
flower_map_front[3] = "images/flowerpower/aster.jpg";
flower_map_front[4] = "images/flowerpower/BirdsOfParadise.jpg";

var flower_map_back = new Array();
flower_map_back[0] = "images/flowerpower/Calla.jpg";
flower_map_back[1] = "images/flowerpower/freesia.jpg";
flower_map_back[2] = "images/flowerpower/gerbera.jpg";
flower_map_back[3] = "images/flowerpower/heather.jpg";
flower_map_back[4] = "images/flowerpower/lily.jpg";

var flip_template = "<div class=\"flip-container\" ontouchstart=\"this.classList.toggle('hover');\" class=\"image_tile\"> <div class=\"flipper\"> <div class=\"front\"><img src='<!-- front content -->'/></div> <div class=\"back\"> <img src='<!-- back content -->'/> </div></div></div>";

function populateDiv(element) {
	for (i = 0; i < flower_map_front.length; i++) {
		result = flip_template.replace('<!-- front content -->', flower_map_front[i]);
		result = result.replace('<!-- back content -->', flower_map_back[i]);

		element.innerHTML += result;
	}
}