$(document).ready (function(){
 	console.log("ready!")

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

		apiUrl = "https://api.giphy.com/v1/gifs/search?q=";
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

