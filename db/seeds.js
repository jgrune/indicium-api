// var mongoose = require("mongoose");
var schema = require("./schema.js");
var seedData = require("./seed.json")

var Tweet = Schema.TweetModel
var Search = Schema.SearchModel

Tweet.remove({}, err => {
  if(err){
    console.log(err)
  }
});

Search.remove({}, err => {
  if(err){
    console.log(err)
  }
});
