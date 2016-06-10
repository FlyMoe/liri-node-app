var fs = require('fs');

// Take in the arguments of : my-tweets, spotify-this-song, movie-this, do-what-it-says
var arguments = process.argv[2];

// Determine which function to call based on the arguments
if (arguments == "my-tweets") {	
	tweets();
} else if (arguments == "spotify-this-song") {
	spotify();
} else if  (arguments == "movie-this") {	
	movie();
} else if (arguments == "do-what-it-says") {
	console.log('Hold please...')
} else {
	console.log("I will not do that.");
}

// Function for twitter
function tweets() {

	// require for twitter
	var twit = require('twitter');

	// require the key.js page
	var keys = require('./keys.js');

	// New twitter instance
	var twitter = new twit(keys.twitterKeys);

	// Parameters of the tweets
	var params = {screen_name: 'FlyMoe99', count: 20};

	twitter.get('statuses/user_timeline', params, function(error, data, response){
 	 	if (!error) {
 	 		for (var i=0; i < data.length; i++) {

				// Name
 	 			console.log("Name: " + data[i].user.name);

 	 			// Screen Name
 	 			console.log("Screen Name: " + data[i].user.screen_name);

 	 			// Tweet Text
 	 			console.log("Tweet Text: " + data[i].text);

 	 			// Date of the tweet
 	 			var dateObj = new Date(data[i].created_at);
 	 			var month = dateObj.getUTCMonth() + 1; //months from 1-12
				var day = dateObj.getUTCDate();
				var year = dateObj.getUTCFullYear();
 	 			console.log("Date: " + month + "/" + day + "/" + year);

 	 			// Break Between Tweets
 	 			console.log(" ");
 	 		}
    		//console.log(data);
  		}
	});
}

// Function for Spotify
function spotify() {

	// require spotify
	var spotify = require('spotify');

	// Get the song name from the command line
	var song = process.argv[3];

	// If the song name is null the default is Blink 182's song: "what's my age again"
	if (song === undefined || song === null) {
		song = "what's my age again";
	}

	spotify.search({ type: 'track', query: song }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
    	console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
	})


}

// Function for movies
function movie() {

	// Require request
	var request = require('request');

	var url = "http://www.omdbapi.com/?t=" + index3 + "&y=&plot=short&tomatoes=true&r=json";

	request(url, function (error, response, body) {
		body = JSON.parse(body);
		// console.log(body);
		console.log(body.Title);
		console.log(body.Year);
		console.log(body.imdbRating);
		console.log(body.Country);
		console.log(body.Language);
		console.log(body.Plot);
		console.log(body.Actors);
		console.log(body.tomatoUserRating);
        console.log(body.tomatoURL);

	})
}

// // Function for Spotify
// function spotify() {

// 	// require spotify
// 	var spotify = require('spotify');

// 	var song = "";

// 	fs.readFile('random.txt', 'utf8', function (err,data) {
// 	  if (err) {
// 	    return console.log(err);
// 	  } else {
// 	  	//Split the string with the seperator as a comma
// 	  	var strSplit = data.split(",");

// 		// The song string is the 1st index of the array after spliting it.
// 	  	// Remove the quotes from the beginning and end of the song string.
// 	  	song = strSplit[1].replace(/['"]+/g, '')
// 	  	console.log("song: "+song);	

// 		spotify.search({ type: 'track', query: song }, function(err, data) {
// 	    	if (err) {
// 	        	console.log('Error occurred: ' + err);
// 	        	return;
// 	    	}
// 	    	console.log(data);
// 	    	// console.log(JSON.stringify(data, null, 2));
// 	    	console.log(data.tracks.items[0].artists[0].name)
// 	        console.log(data.tracks.items[0].name);
// 	        console.log(data.tracks.items[0].preview_url);
// 	        console.log(data.tracks.items[0].album.name);
// 		})

// 	  }	
// 	});
// }

