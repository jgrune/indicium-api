var MonkeyLearn = require('monkeylearn');
var mongoose = require('../db/schema.js')
var Tweet = mongoose.model("Tweet")

var tweetController = {
  index: (req,res) => {
    Tweet.find({}).then((tweets) => {
      res.json(tweets)
    })
  },
  show: (req,res) => {
    var searchText = []
    var text = ""

    Tweet.find({
      body: new RegExp(req.params.search, "i")
    }).then((tweets) => {
      tweets.forEach((tweet, i) => {
        text += tweet.body + " "
      })
      searchText.push(text)
      res.json(tweets)
      callMonkeyLearn(searchText)
    })
  }
}

function callMonkeyLearn(searchText){
  var MonkeyLearn = require('monkeylearn');
  var ml = new MonkeyLearn('e5058891ff5968487d756aa9a229e9993325b011');
  var module_id = 'cl_mcHq5Mxu';
  var text_list = searchText;

  var p = ml.classifiers.classify(module_id, text_list, true);

  p.then(function (res) {
    console.log(res.result);
  });
}

module.exports = tweetController;
