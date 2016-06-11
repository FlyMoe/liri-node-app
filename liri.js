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
	doWhatItSays();
} else {
	console.log("Type in either my-tweets, spotify-this-song, movie-this, or do-what-it-says");
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

 	 			var text = "Name: " + data[i].user.name + "\n" +
			    		   "Screen Name: " + data[i].user.screen_name + "\n" +
					       "Tweet Text: " + data[i].text + "\n" +
					       "Date: " + month + "/" + day + "/" + year + "\n" +
					       "===========================================" + "\n";

				// Write text to a file
				writeToText(text);
 	 		}
  		}
	});
}

// Function for Spotify
function spotify(song) {

	// require spotify
	var spotify = require('spotify');

	if (song === undefined || song === null) {

		// Get the song name from the command line
		var song = process.argv[3];

		// If the song name is null the default is Blink 182's song: "what's my age again"
		if (song === undefined || song === null) {
			song = "what's my age again";
		}

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
	

		var text = "Artist: " + data.tracks.items[0].artists[0].name + "\n" +
			       "Song Name: " + data.tracks.items[0].name + "\n" +
			       "Preview URL: " + data.tracks.items[0].preview_url + "\n" +
			       "Album Name: " + data.tracks.items[0].album.name + "\n" +
			       "===========================================" + "\n";

		// Write text to a file
		writeToText(text);

	})
}

// Function for movies
function movie(movie) {

	// Require request
	var request = require('request');

	if (movie === undefined || move === null) {

		// Get the movie title from the command line
		var movie = process.argv[3];

		// If the movie is null the default is "Mr. Nobody"
		if (movie === undefined || movie === null) {
			movie = "Mr. Nobody";
		}

	}

	var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			console.log("Title: " + body.Title);
			console.log("Year: " +body.Year);
			console.log("IMDB Rating: " +body.imdbRating);
			console.log("Country: " +body.Country);
			console.log("Language: " +body.Language);
			console.log("Plot: " +body.Plot);
			console.log("Actors: " +body.Actors);
			console.log("Tomato User Rating: " +body.tomatoUserRating);
	        console.log("Tomato URL: " +body.tomatoURL);

	        var text = "Title: " + body.Title + "\n" +
			       	   "Year: " +body.Year + "\n" +
			           "IMDB Rating: " +body.imdbRating + "\n" +
			           "Country: " +body.Country + "\n" +
			           "Language: " +body.Language + "\n" +
			           "Plot: " +body.Plot + "\n" +
			           "Actors: " +body.Actors + "\n" +
			           "Tomato User Rating: " +body.tomatoUserRating + "\n" +
			           "Tomato URL: " +body.tomatoURL + "\n" +
			           "===========================================" + "\n";

			// Write text to a file
			writeToText(text);
		}
	})


}

// Function for do-what-it-says
function doWhatItSays() { 

	fs.readFile('random.txt', 'utf8', function (err,data) {
		if (err) {
	    	return console.log(err);
	 	} else {
		  	//Split the string with the seperator as a comma
		  	var strSplit = data.split(",");
		  	console.log(strSplit[0]);
		  	console.log(strSplit[1]);

		  	switch(strSplit[0])	{
		  		case "spotify-this-song":
		  			spotify(strSplit[1]);
		  			break;
		  		case "movie-this":
		  			movie(strSplit[1]);
		  			break;
		  	}
		}
	});
}

// Function to write to a text file.
function writeToText(text){
	fs.appendFile('log.txt', text, function (err) {
		if (err) return console.log(err);
	 	console.log("Text written to log.txt");
	});
}

