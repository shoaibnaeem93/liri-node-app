require("dotenv").config();

var fs = require('fs');
var request = require("request");


var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var input = process.argv[2];
var nodeArgs = process.argv;
var search = "";

//functions
function myTweets() {
    console.log("This is where tweets will go:");

    client.get('/statuses/user_timeline.json', {limit: 20}, function(error, tweets, response) {
        if(error) throw error;

        for (var i = 0; i < tweets.length; i++) {

            console.log("\nTweet: " + tweets[i].text); 
            console.log("Created at: " + tweets[i].created_at);
        }       
      });
};

function spotifyThisSong() {
    for (var i = 3; i < nodeArgs.length; i++) {
        search += nodeArgs[i] + " ";
    };
        
if (search) {

    console.log("Searching for: " + search);
    
    spotify.search({ type: 'track', query: search }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;  
        }
        else if (search) {
        var songInfo = data.tracks.items[0];
        console.log("\n--------");
        console.log("Artist(s): " + songInfo.artists[0].name);
        console.log("Song Name: " + songInfo.name);
        console.log("Preview Link: " + songInfo.preview_url);
        console.log("Album Name: " + songInfo.album.name);
        };
    });

} else { 
    
    spotify.search({ type: 'track', query: "Ace of Base" }, function(err, data) {
        var songInfo = data.tracks.items[0];
        console.log("\n--------");
        console.log("Artist(s): " + songInfo.artists[0].name);
        console.log("Song Name: " + songInfo.name);
        console.log("Preview Link: " + songInfo.preview_url);
        console.log("Album Name: " + songInfo.album.name);
    }
)};
};

function movieThis() {
    for (var i = 3; i < nodeArgs.length; i++) {
        search += nodeArgs[i] + " ";
    };

if (search) {

    console.log("Searching for: " + search);

request("http://www.omdbapi.com/?t="+ search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("\n--------");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]["Value"]);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actor(s): " + JSON.parse(body).Actors);
  }
  
});

} else {

    console.log("Searching for: Mr. Nobody");

    request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {


        if (!error && response.statusCode === 200) {
            
            console.log("\n--------")
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \nIt's on Netflix!");
      
          
          console.log("\n--------")
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]["Value"]);
          console.log("Country Produced: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actor(s): " + JSON.parse(body).Actors);
        } 
      });
}
};



if (input == "my-tweets") {
    myTweets();
    
} else if (input == "spotify-this-song") {
    spotifyThisSong();

} else if (input == "movie-this") {
    movieThis();

} else if (input == "do-what-it-says") {

    console.log("do what it says");

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        
        var dataArr = data.split(",");

        input = dataArr[0];
        search = dataArr[1];

        if (input == "my-tweets") {
            myTweets();
            
        } else if (input == "spotify-this-song") {
            spotifyThisSong();
        
        } else if (input == "movie-this") {
            movieThis();
        };
      });
};