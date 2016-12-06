var MonkeyLearn = require('monkeylearn');
var mongoose = require('../db/schema.js')
var Tweet = mongoose.model("Tweet")
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '90cdce4101b60788c761f5610151f6d7837c443b'
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
          extract: 'entities, concepts, doc-sentiment, doc-emotion',
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


// ============
// MONKEY LEARN
// ============

// function callSentimentAnalysis(searchText){
//   var MonkeyLearn = require('monkeylearn');
//   var ml = new MonkeyLearn('e5058891ff5968487d756aa9a229e9993325b011');
//   var module_id = 'cl_mcHq5Mxu';
//   var text_list = searchText;
//
//
// // ==============
// // ACTUAL API CALL
// // ==============
// //
//     var p = ml.classifiers.classify(module_id, text_list, true);
//
//     let def = p.then(function (res) {
//       return res.result[0][0]
//     });
//
//     return def
// //
// // ==== end of call ======
// }
//
// function callEntityPull(searchText){
//   var MonkeyLearn = require('monkeylearn');
//
//   var ml = new MonkeyLearn('dd6214d9b29784d3acc6bdc1b3f014731223623e');
//   var module_id = 'ex_isnnZRbS';
//   var text_list = searchText;
//
//   // var p = ml.extractors.extract(module_id, text_list);
//   // p.then(function (res) {
//   //     console.log(res.result);
//   // });
//
// }

module.exports = tweetController;
