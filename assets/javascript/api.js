
//name animal buttons that will exist when page loads
var animals = ["tigers", "bears", "dogs", "lions", "rhinos", "ostriches", "monkeys"];

//function to add new buttons
function renderButtons(){
//empty the div on the page
	$("#animal-buttons").empty();
//for loop through animals array. makes a button and puts the aimal name in as the data-name. this will be used when searching giphy api
	for(i=0; i<animals.length; i++){

		newBtn = $("<button class='btn btn-lg btn-primary animal'>")
		newBtn.attr("data-name", animals[i]);
		newBtn.html(animals[i]);
		$("#animal-buttons").append(newBtn);
	};


};

//function for calling API and displaying Gifs
function displayGifs (){
//selects the data name attribute of the button chosen
	var animalChosen = $(this).attr("data-name");
//saves the URL as a variable. inserts the data name that was chosen above. Also 10 options and raing up to pg
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animalChosen+"&api_key=dc6zaTOxFJmzC&tag=&limit=10&rating=pg";  
//empty the gif info div
	$("#gif-info").empty();

	console.log(queryURL);
//ajax call to the saved url to get a json object
	$.ajax({

		url: queryURL,
		method: "GET"
	}).done(function(response){

		console.log(response);
		console.log(animalChosen);
//save the array needed out of the json object
		animalArray = response.data;

//for loop through the 10 options we received from our query
		for (i=0; i<animalArray.length; i++){
			
//create new div to put the gif and rating into. id gif used for css
				newDiv = $("<div id=gif>");
//save the url of the still gif as a variable	
				var newImgStill = response.data[i].images.fixed_width_still.url;
//save the url of the animated gif as another variable
				var newImgAnimate = response.data[i].images.fixed_width.url;
//save the rating as a variable
				var rating = response.data[i].rating;

				console.log(rating);

//new image tag to place the gif
				imgDiv = $("<img>");
//default src will be the still image. we dont want it to animate until clicked
				imgDiv.attr("src", newImgStill);
//attribute data-still as the still img url and data animate as the animated url. this way we can call them back
				imgDiv.attr("data-still", newImgStill);
				imgDiv.attr("data-animate", newImgAnimate);
//data state set to still. this way we can test which state it is in with a conditional 
				imgDiv.attr("data-state", "still");
//add class to be used for on click and also bootstrap classes for style
				imgDiv.addClass("gif img img-responsive");
//add the image to the div created above
				newDiv.html(imgDiv);
//add the rating to the same div
				newDiv.append("Rating: " + rating);
//display the new div on the page
				$("#gif-info").append(newDiv);
		}

	});

};



//function to display the new buttons
renderButtons();

$(".submit").on("click", function(){
//prevent default so the page does not reload
event.preventDefault();
//conditional- only runs the rest of function if there is a value in the input box
if($("#animal-input").val() != ""){
	console.log($("#animal-input").val());
	
//whatever is in the animal input saved as a variable
	var newAnimal = $("#animal-input").val().trim();
//push this into the new animal array
	animals.push(newAnimal);
//diplay buttons on page
	renderButtons();
//empty the input when 
	$("#animal-input").val("");
};	



});



//run display gifs whan a button with class animal is pushed
$(document).on("click", ".animal", displayGifs);


//when an img with class gif is clicked, the below will make it start or stop
$(document).on("click",".gif", function() {
      // state will equal the current value of the data-state attribute
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


});






