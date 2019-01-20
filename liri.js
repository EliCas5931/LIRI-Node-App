// .env will hide my keys
require("dotenv").config();

// define all the variables you need here
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Swap out request with Axios
//var request = require("request");
var moment = require("moment");

var axios = require("axios");

// Get user input this way
//This is the 3rd part of the users input
var command = process.argv[2];
console.log(command);

//This takes the 4th part of the users input and can take multiple words
var context = process.argv.slice(3).join(" ");
console.log(context)



// switches for all the commands
switch (command) {
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
    // Get venue, location, and event date
    var artist = context;
    var concertURL = "https://www.bandsintown.com/artists" + artist + "/events?app_id=codingbootcamp";

    axios.get(concertURL).then( 
        function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(error);

            var results = JSON.parse(body);
            console.log(body);

            console.log("Venue Name: " + results.value.name);
            console.log("Location: " + results.venue.city);
            console.log("Event Date: " + moment(results.datetime).format("MM/DD/YYYY"));
        }
    })
}

function spotifyThisSong(trackName) {
    //Get "The Sign" by Ace of Base if no song title is given
    if (context === "") {
        context = "The Sign";
    }
    spotify.search({ type: 'track', query: context }, function (err, data) {
        if (err) {
            return console.log("Error Occurred: " + err);
        }
        if (context === "The Sign") {
            //Return Ace of Base
            for (i = 0; i < data.tracks.items.length; i++) {
                console.log(data.tracks.items[i]);
                if (data.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("-------------------------------------------------------------------------------------");
                    console.log("Artist: " + data.tracks.items[i].artists[0].name);
                    console.log("Song Title: " + data.tracks.items[i].name);
                    console.log("Preview: " + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                }
            }
        } else {
            console.log("-------------------------------------------------------------------------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    })

}

function movieThis() {
    //Get Mr. Nobody if no movie title is given
    var title = context;
    if (title === "") {
        title = "Mr. Nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=bd0f2010").then(

        function (response) {
        //request(movieURL, function (error, response, body) {
        //If it's successful!
        if (!error && response.statusCode === 200) {

            //requested data goes here
            var response = JSON.parse(response);
            var queryResults = [
                "Title: " + response.Title,
                "Year: " + response.Year,
                "IMDB Rating: " + response.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + response.Ratings[1].Value,
                "Country: " + response.Country,
                "Language: " + response.Language, 
                "Plot: " + response.Plot, 
                "Actors: " + response.Actors + "\n"  
                ]
                console.log(queryResults);
                movieLog();
        } else {
            console.log("Error Occurred: " + err);
        }
    })
}

function doWhatItSays() {
    //Get "I Want it That Way" from random.text
    fs.readFile("random.txt", "utf8", function read(err, data) {
        if (err) throw err;
        console.log(data);
    })
}

function movieLog() {
    //Append log results to log.text
    fs.appendFile('log.txt', queryResults, function (err) {
        if (err) throw err;
        console.log(queryResults);
    })
}