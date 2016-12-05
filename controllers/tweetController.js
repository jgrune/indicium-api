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
      callSentimentAnalysis(searchText).then((data) => {
        console.log("this is the promise returned form callSentimentAnalysis")
        console.log(data)
      })
      console.log(category)
      console.log(result)
      res.json({tweets: tweets, sentiment: result})

      // callEntityPull(searchText)
    })
  }
}

function callSentimentAnalysis(searchText){
  var MonkeyLearn = require('monkeylearn');
  var ml = new MonkeyLearn('e5058891ff5968487d756aa9a229e9993325b011');
  var module_id = 'cl_mcHq5Mxu';
  var text_list = searchText;


// ==============
// ACTUAL API CALL
// ==============
//
    var p = ml.classifiers.classify(module_id, text_list, true);

    let def = p.then(function (res) {
      return "pizza"
    });

    return def
//
// ==== end of call ======
}

function callEntityPull(searchText){
  var MonkeyLearn = require('monkeylearn');

  var ml = new MonkeyLearn('dd6214d9b29784d3acc6bdc1b3f014731223623e');
  var module_id = 'ex_isnnZRbS';
  var text_list = searchText;

  // var p = ml.extractors.extract(module_id, text_list);
  // p.then(function (res) {
  //     console.log(res.result);
  // });

}

module.exports = tweetController;
