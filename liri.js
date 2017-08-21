var fs = require("fs");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doWhat();
        break;
}


function myTweets() {
    var keys = require("./keys.js");
    var client = new twitter(keys.twitterKeys);
    var params = {
        screen_name: "Kelly__Watkins",
        count: 20
    }

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(" ");
                console.log([i + 1] + ". " + tweets[i].text);
                console.log("Created on: " + tweets[i].created_at);
                console.log(" ");
            }
        }
        else {
            console.log(error);
        }
    });
}

function spotifyThis(value) {
    var NewSpotify = new spotify({
        id: "6c5a12a8825e4451b6679d26d0ac231c",
        secret: "3c6d002572f644bab0616bd7ebe8330f"
    });

    if (value === null) {
        value = "The Sign"
    }
    NewSpotify.search({type: "track", query: value}, function(err, data) {
        if (!err) {
            console.log(" ");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(" ");
        }
        else {
            console.log(err);
       }
    });
}

function movieThis(value) {
    if (value === null) {
        var value = "Mr Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece"

    request(queryURL, function(error, response, body) {
        if (!error) {
            console.log(" ");
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log(" ");
        }
    })
}

function doWhat() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } 
        else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                omdbThis(dataArr[1]);
            }
        }
    });
}