//requiring dependencies
var tweetController = require("./controllers/tweetController")
var searchController = require("./controllers/searchController")
var express = require("express");
var parser = require("body-parser")
var cors = require('cors')
var app = express();
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '90cdce4101b60788c761f5610151f6d7837c443b'
});


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
