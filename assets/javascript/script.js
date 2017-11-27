//VARIABLES
var topics = ["The Godfather", "Raging Bull", "Goodfellas", "Arrested Development", "Freaks and Geeks", "Firefly"];
var apiKey = "Zi1nGYxEU6M2uyg4IYeyUQx5FBYrUlr8"

//FUNCTIONS
function createButtons() {
	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var t = $("<button>");
		t.addClass("topic");
		t.attr("data-name", topics[i]);
		t.text(topics[i]);
		$("#buttons").append(t);
	}
}
createButtons();
$(document).ready(function(){

//METHODS
$("#add-topic").click(function(event){
	event.preventDefault();
	var topic = $("#topic-input").val().trim();
	topics.push(topic);
	$("#topic-input").val(" ");
	createButtons();
});

$(document).on("click", "button", function() {
	var thisButton = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        thisButton + "&api_key=" + apiKey + "&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {
		console.log(queryURL);
		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++) {

			var topicDiv = $("<div>");
			var p = $("<p>").text("Rating: " + results[i].rating);
			var topicImage = $("<img>");

			var animatedImage = results[i].images.fixed_height.url;
			var stillImage = results[i].images.fixed_height_still.url;

			topicImage.attr("src", animatedImage);
			topicImage.attr("data-still", stillImage);
			topicImage.attr("data-animate", animatedImage);
			topicImage.attr("data-state", "animate");

			topicDiv.append(p);
			topicDiv.append(topicImage);

			$("#topic-gifs").prepend(topicDiv);
		}

	});

});

$(document).on("click", "img", function(){
	var state = $(this).attr("data-state");
	if (state === "animate") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	} else {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}

});
	
});
//METHODS
