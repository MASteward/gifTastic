
var topicsArray = ["Dachshund", "Bloodhound", "Beagle", "Terrier", "Rottweiler", "German Shephard"];
var dogImage;




$("#subBtn").on("click", function(){
	event.preventDefault();
	var newDog = $("#gifInput").val().trim();
	newDog = newDog[0].toUpperCase()+ newDog.substr(1);
	topicsArray.push(newDog);
	// console.log(topicsArray);
	$("#gifInput").empty();
	generateBtn();
})


function generateBtn(){	
	$(".gifBtns").empty();
	
	for (var i = 0; i < topicsArray.length; i++) {
		var btnSection = $("<div>");
		var topicBtn = $("<button>");

		topicBtn.addClass("dogGif");
		
		topicBtn.attr("data-name", topicsArray[i]);

		topicBtn.text(topicsArray[i]);

		btnSection.append(topicBtn)
		
		// console.log(topicBtn);
		$(".gifBtns").append(btnSection);
	}
};

$(".gifBtns").on("click", "button", function(){
	var dog = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=dog," + dog + "&api_key=ZfkYtYtWGf82OxmHezhSVKtN1lJV1ltk&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.then(function(response){
		results = response.data;
		$("#gifArea").empty();
		for (var i = 0; i < results.length; i++) {
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				
				var gifDisplay = $("<div class='gifItem'>");
				
				var rating = results[i].rating;
				
				var p = $("<p>").text("Rating: " + rating);
				
				dogImage = $("<img>");

				dogImage.attr("id", "gifOfDog");
				
				dogImage.attr("src", results[i].images.fixed_height_still.url);

				dogImage.attr("data-still", results[i].images.fixed_height_still.url);

				dogImage.attr("data-animate", results[i].images.fixed_height.url);

				dogImage.attr("data-state", "still");

				gifDisplay.append(dogImage);

				gifDisplay.append(p);

				$("#gifArea").prepend(gifDisplay);
			}
		}
	});
});

$("#gifArea").on("click", "img", function() {
	// console.log(dogImage);
	var state = $(this).attr('data-state');

	if (state === "still") {
		console.log(dogImage);
	  $(this).attr("src", $(this).attr("data-animate"));
	  $(this).attr("data-state", "animate");
	} 
	else {
	  $(this).attr("src", $(this).attr("data-still"));
	  $(this).attr("data-state", "still");
	}
	
});

generateBtn();