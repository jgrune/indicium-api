//requiring dependencies
var tweetController = require("./controllers/tweetController")
var searchController = require("./controllers/searchController")
var keys = require("./keys.js")
var express = require("express");
var parser = require("body-parser")
var cors = require('cors')
var app = express();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: keys.watson
});
var Twit = require('twit')

//twitter API keys
var T = new Twit({
  consumer_key:         keys.twitter.consumer_key,
  consumer_secret:      keys.twitter.consumer_secret,
  access_token:         keys.twitter.access_token,
  access_token_secret:  keys.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//enable cors
app.use(cors());

//setting body parser for form submissions
app.use(parser.json({extended: true}));
app.use(parser.urlencoded({extended:true}))

//setting up port
app.listen(4000), () => {
  console.log("app listening on port 4000");
}

//routes for express
app.get("/api/tweets", tweetController.index)
app.get("/api/tweets/:search", tweetController.show)
app.post("/api/searches", searchController.new);
