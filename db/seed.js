var mongoose = require("./schema.js");

var tweetData = require("./seed_data/tweets.json");
var searchData = require("./seed_data/search_seeds.json");

var Tweet = mongoose.model("Tweet")
var Search = mongoose.model("Search")

Tweet.remove({}).then(() => {
  Tweet.collection.insert(tweetData).then(() => {
    process.exit();
  })
})

Search.remove({}).then(() => {
  Search.collection.insert(searchData).then(() => {
    process.exit();
  })
})
