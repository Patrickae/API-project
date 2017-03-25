var animals = ["tiger", "bear", "dog", "lion", "rhino", "ostrich", "monkey"];


function renderButtons(){

	$("#animal-buttons").empty();

	for(i=0; i<animals.length; i++){

		newBtn = $("<button class='btn btn-lg btn-primary animal'>")
		newBtn.attr("data-name", animals[i]);
		newBtn.html(animals[i]);
		$("#animal-buttons").append(newBtn);
	};


};


function displayGifs (){

	var animalChosen = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animalChosen+"&api_key=dc6zaTOxFJmzC&tag=&limit=10"  
	

	console.log(queryURL);

	$.ajax({

			url: queryURL,
			method: "GET"
	}).done(function(response){

		console.log(response);
		console.log(animalChosen);

		animalArray = response.data;

		

		for (i=0; i<animalArray.length; i++){

			newDiv = $("<div>");

			var newImgStill = response.data[i].images.fixed_width_still.url;
			var newImgAnimate = response.data[i].images.fixed_width.url;

			imgDiv = $("<img>");
			
			imgDiv.attr("src", newImgStill);
			imgDiv.attr("data-still", newImgStill);
			imgDiv.attr("data-animate", newImgAnimate);
			imgDiv.attr("data-state", "still");

			imgDiv.attr("src", newImgStill);
			imgDiv.addClass("gif");

			newDiv.html(imgDiv);

		$("#gif-info").prepend(newDiv);

		}



	});





};

renderButtons();

$(".submit").on("click", function(){

	event.preventDefault();

	var newAnimal = $("#animal-input").val().trim();

	animals.push(newAnimal);

	renderButtons();
});




$(document).on("click", ".animal", displayGifs);

$(document).on("click",".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
//        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("src", $(this).data('animate'));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

      console.log("clicked")
    });






