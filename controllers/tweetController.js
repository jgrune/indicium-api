var mongoose = require('../db/schema.js')
var Tweet = mongoose.model("Tweet")
var keys = require("../keys.js")
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: keys.watson
});

var tweetController = {
  index: (req,res) => {
    Tweet.find({}).then((tweets) => {
      res.json(tweets)
    })
  },
  show: function example(req,res) {
    var searchText = [];
    var text = "";
    var regex = new RegExp(` ${req.params.search} `, "i");

    Tweet.find({
      body: regex
    }).then((tweets) => {
      tweets.forEach((tweet, i) => {
        text += tweet.body + ". "
      })
        searchText.push(text)
        var parameters = {
          extract: 'entities, concepts, doc-sentiment, doc-emotion, keywords',
          text: searchText
        };
        alchemy_language.combined(parameters, function (err, response) {
          if (err)
            console.log('error:', err);
          else
            console.log(JSON.stringify(response, null, 2));
            res.json(response);
        });
      })
  }
}

module.exports = tweetController;
