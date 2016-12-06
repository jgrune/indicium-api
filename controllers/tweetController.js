var MonkeyLearn = require('monkeylearn');
var mongoose = require('../db/schema.js')
var Tweet = mongoose.model("Tweet")
var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

var tweetController = {
  index: (req,res) => {
    Tweet.find({}).then((tweets) => {
      res.json(tweets)
    })
  },
  show: (req,res) => {

    var output = {};
    var searchText = [];
    var text = "";
    var regex = new RegExp(` ${req.params.search} `, "i");

    Tweet.find({ body: regex }).then((tweets) => {
      console.log("These are the tweets")
      console.log(tweets);
      tweets.forEach((tweet, i) => {
        text += tweet.body + " "
      });
      searchText.text.push(text);
      res.json(tweets);
      // entities(searchText).then((data) =>{
      //   console.log("Hitting the promise");
      //   console.log(data);
      //   res.json(tweets)
      // })
    })
  }
}

function entities(req, res, output) {
  alchemyapi.entities('text', searchText,{ 'sentiment':1 }, function(response) {
    output['entities'] = { text:searchText, response:JSON.stringify(response,null,4), results:response['entities'] };
    keywords(req, res, output);
  });
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
