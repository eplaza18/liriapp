require("dotenv").config();

const axios = require("axios");
const keys = require("./keys.js");

const fs = require("fs");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const moment = require("moment");

let searchType = process.argv[2];
let searchSubject = process.argv.slice(3).join(" ");

//Movie Search if else statements
if (searchType === "movie-this" && !searchSubject) {
  movieName = "mr nobody";
  movieSearch();
} else if (searchType === "movie-this") {
  movieName = searchSubject;
  movieSearch();
}

// Movie Search Command = 'movie-this';
function movieSearch() {
  var movieUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(movieUrl).then(function(response) {
    // console.log(JSON.stringify(response.data, null, 2));
    console.log(`Title: ${response.data.Title}`);
    console.log(`Year: ${response.data.Year}`);
    console.log(`IMDB: ${response.data.Ratings[0].Value}`);
    console.log(`Rotten Tomatoes: ${response.data.Ratings[1].Value}`);
    console.log(`Country: ${response.data.Country}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Cast: ${response.data.Actors}`);
    // console.log(`${movieName} released on ${response.data.Released}`);
  });
}
//Spotify-search if else statements
if (searchType === "spotify-this-song" && !searchSubject) {
  // song = "The Sign";
  // spotifySearch(); - returns a Harry Styles song the sign instead of Ace of Base
  spotify
    .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
    .then(function(response) {
      console.log("Artist: " + response.artists[0].name);
      console.log("Preview: " + response.preview_url);
      console.log("Album: " + response.album.name);
      console.log("Title: " + response.name);
    })
    .catch(function(err) {
      console.log(err);
}
// Spotify Search Command - 'spotify-this-song'
function spotifySearch() {
  spotify
    .search({ type: "track", query: song, limit: 1 })
    .then(function(response) {
      // console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2))

      console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
      console.log("Preview: " + response.tracks.items[0].preview_url);
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log("Title: " + response.tracks.items[0].name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//Concert if else statements
if (searchType === "concert-this") {
  artist = searchSubject;
  concertSearch();
}
// Band in town search - 'concert-this'
function concertSearch() {
  // Provided Bands in town API search
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Venue: " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log(moment(response.data[0].datetime).format("L"));
    });
}

//do it this way if else
if (searchType === "do-what-it-says") {
  thisWay();
}
//do it this way function
function thisWay() {
  const defSong = [];

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");

    for (var i = 0; i < output.length; i++) {
      defSong.push(output[i]);
      song = defSong[1];
    }
    // console.log(song);

    // console.log(defSong);
    spotifySearch();
  });
}
