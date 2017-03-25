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


	var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+animalChosen;  
	var animalChosen = $(this).attr("data-name");

	$.ajax({

			url: queryURL,
			method: "GET"
	}).done(function(response){

		console.log(response);
		console.log(animalChosen);

		newImg = response.data.image_original_url;

		newDiv = $("<div>");

			imgDiv = $("<img>");

			imgDiv.attr("src", newImg);

			newDiv.html(imgDiv);

		$("#gif-info").prepend(newDiv);




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







