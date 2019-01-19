// .env will hide my keys
require("dotenv").config();

// define all the variables you need here
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = require("request");
var movieName = process.argv

// Get user input this way
//This is the 3rd part of the users input
var command = process.argv[2];
console.log(command);

//This takes the 4th part of the users input and can take multiple words
var context = process.argv.slice(3).join(" ");
console.log(context)



// switches for all the commands
switch (liriReturn) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    //put the instructions needed here...
    //google this since it's coming up weird
    default: console.log("\n" + "type a command after 'node liri.js': " + "\n" + 
        "concert-this" + "\n" +
        "spotify-this-song" + "\n" +
        "movie-this" + "\n" +
        "do-what-it-says" + "\n" +
        "Use quotes for multiple words!"
    )
}

function concertThis() {

    var artist = context;
}

function spotifyThisSong(trackName) {
//Get "The Sign" by Ace of Base if no song title is given
    var trackName = process.argv[3]

}

function movieThis() {
//Get Mr. Nobody if no movie title is given
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=bd0f2010";

    request(queryURL, function (error, response, body) {
        //If it's successful!
        if (!error && response.statusCode === 200) {
            
            //requested data goes here
            var myMovieData = JSON.parse(body);
            var queryResults = 
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n" +

                console.log(queryResults);
        } else {
            console.log("Error Occurred: " + err);
        }
    })
}

function doWhatItSays() {
//Get "I Want it That Way" from random.text
}