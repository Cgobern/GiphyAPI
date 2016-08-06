$(document).ready (function(){
 	console.log("ready!")

	// 	var sportCount = 0;

	// //On click function for addSport
	// 	$('#addSport').on('click', function(){
	// 		//random search for sports and api
	// 		var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=5&tag=sports";
	// 	 	$.ajax({url: queryURL, method: 'GET'})
	// 	 	//query
	// 	 	.done(function(response) {
	// 	 		//image_url to specific object
	// 	 		var imageUrl = response.data.image_original_url;
	// 	 		var sportImage = $('<img>');

	// 	 		//gives the sportImage a path of imageUrl
	// 	 		sportImage.attr('src', imageUrl);
	// 	 		sportImage.attr('alt', 'sport image');

	// 	 		//attaching sport image before content
	// 	 		$('#sportPics').prepend(sportImage);
	// 	 	});
	// 	 	//get the "value" of what the user types
	// 	 	value = $('#sports').val().trim();

	// 	 	//creates a new paragraph to hold sports
	// 	 	sport = $('<p>');

	// 	 	//adds an Id to new "sport" paragraph and item plus which ever number (i.e. item- 4)
	// 	 	sport.attr('id', "item-" + sportCount);

	// 	 	//attaches the "value" to the new sport paragraph
	// 	 	sport.prepend(value);

	// 	 	var button = $('<button>');
	// 	 	button.attr('id', 'item-' + sportCount);

	// 	 	button.attr("data-sport", sportCount);
	// 		button.addClass("checkbox"); 
	// 		button.text("X");
	// 		sport.append(button);

	// 		//add the buttons before sport item to the "sports" div
	// 		$("#sports").prepend(sport);

	// 		// Clear
	// 		$("#sport").val("");

	// 		// Add 
	// 		sportCount++;

	// 		// No Refreshing (return false)
	// 		return false;
	// 	});


	// 	$(document.body).on('click', '.checkbox', function(){

	// 		// Get the animalNumber of the button from its data attribute.
	// 		var sportNumber = $(this).data('data-sport');

	// 		// Empty specific <p> element 
	// 		$('#item-'+ sportNumber).remove();

	// 		// Empty specific <p> element 
	// 		var id = this.id;
	// 		$("#" + id).remove();
	// 	});	



		
	// });

var textVal;
var newButton;
var apiUrl;
//var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
var status;

	var apiPlus = "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg&tag=sports";

	$('#submit').on('click', function(){

		textVal =  $('#getSport').val().trim();

		if(textVal != ""){

			newButton = $("<button></button>").text(textVal).css({'margin': '5px 5px'});
			newButton.attr('data-search', textVal);
			$("#sportsButtons").append(newButton);

			$('#getSport').val("");
			
		}

		$("#sportsButtons").addClass('addSportButtons');

	});

	$("#sportsButtons").on('click', "button", function(){

		apiUrl = "http://api.giphy.com/v1/gifs/search?q=";
		apiUrl = apiUrl+ $(this).attr('data-search') + apiPlus;

		$('#sportPics').empty();

		$.ajax({
			url: apiUrl,
			method: 'GET'
		}).done(function(sport){

			$("#sportPics").addClass("addSportPics");

			for(var i = 0; i < 10; i++){

				var newDiv = $('<div class="sportsDiv">');
				var newPara = $('<p class="rating">').html("Rating: " + sport.data[i].rating);
				$(newDiv).append(newPara);

				var newImg = $('<img>').attr({'src': sport.data[i].images.downsized_still.url,
											  'data-pic': sport.data[i].images.downsized_still.url,
											  'data-gif': sport.data[i].images.downsized.url,
											  'data-status': 'pic',
											  'margin': '10px 10px'});
				$(newDiv).append(newImg);
				$('#sportPics').append(newDiv);
			}

		});

	});

	$("#sportPics").on('click', ".sportsDiv", function(e){

		status = $(e.target).attr('data-status');

		if(status == 'pic'){

			$(e.target).attr('src', $(e.target).attr('data-gif'));
			$(e.target).attr('data-status', 'gif');


		} else if(status == 'gif'){

			$(e.target).attr('src', $(e.target).attr('data-pic'));
			$(e.target).attr('data-status', 'pic');

		}

	});	
});

