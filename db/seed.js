// var mongoose = require("mongoose");
var mongoose = require("./schema.js");
var tweetData = require("./seeds1.json")
var searchData = require("./seeds2.json")

var Tweet = mongoose.model("Tweet")
var Search = mongoose.model("Search")

Tweet.remove({}, err => {
  if(err){
    console.log(err)
  }
}).then(() => {
  Tweet.collection.insert(tweetData).then(() => {
    process.exit();
  })
})

Search.remove({}, err => {
  if(err){
    console.log(err)
  }
}).then(() => {
  Search.collection.insert(searchData).then(() => {
    process.exit();
  })
})
