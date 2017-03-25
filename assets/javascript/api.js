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

renderButtons();

$(".submit").on("click", function(){

	event.preventDefault();

	var newAnimal = $("#animal-input").val().trim();

	animals.push(newAnimal);

	renderButtons();
});