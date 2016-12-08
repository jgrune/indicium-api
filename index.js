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

//enable cors
app.use(cors());

//setting body parser for form submissions
app.use(parser.json({extended: true}));
app.use(parser.urlencoded({extended:true}))

//setting up port
app.set("port", process.env.PORT || 4000);


app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});

//routes for express
app.get("/api/tweets/:search", tweetController.show)

app.post("/api/searches", searchController.new);
