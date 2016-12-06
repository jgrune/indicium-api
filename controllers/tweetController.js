var mongoose = require('../db/schema.js')
var Tweet = mongoose.model("Tweet")
var keys = require("../keys.js")
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: keys.watson
});



// ===== TWITTER API =======
var Twit = require('twit')

//select number of tweets you want returned
var numTweets = 5;

//twitter API keys
var T = new Twit({
  consumer_key:         keys.twitter.consumer_key,
  consumer_secret:      keys.twitter.consumer_secret,
  access_token:         keys.twitter.access_token,
  access_token_secret:  keys.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

function getTweets(search) {
  let cleanData = T.get('search/tweets', { q: `${search} since:2011-07-11`, count: numTweets }, function(err, data, response) {
    if(err){
      console.log(`error: ${err}`);
    }
  }).then((rawData) => {
    let dataArray = []
    for (i in rawData.data.statuses){
      data = {}
      data.text = rawData.data.statuses[i].text
      data.created_at = rawData.data.statuses[i].created_at
      data.userName = rawData.data.statuses[i].user.screen_name
      data.retweets = rawData.data.statuses[i].retweet_count
      data.favorites = rawData.data.statuses[i].favorite_count

      dataArray.push(data)
    }
    return dataArray
  })

  return cleanData

// manipulate rawdata into clean data
  // cleanData = rawData.data.statuses[0].text
  // console.log("this is our clean data:")
  // console.log(cleanData);
  //
  // return cleanData
}

// ======= TWEET CONTROLLER ============

var tweetController = {
  index: (req,res) => {
    Tweet.find({}).then((tweets) => {
      res.json(tweets)
    })
  },
  show: (req,res) => {
    getTweets(req.params.search).then((response) => {
      res.json(response)
    })


    // .then((response) => {
    //   res.json(response)
    // })

    //
    // var searchText = [];
    // var text = "";
    // var regex = new RegExp(` ${req.params.search} `, "i");
    //
    // Tweet.find({
    //   body: regex
    // }).then((tweets) => {
    //   tweets.forEach((tweet, i) => {
    //     text += tweet.body + ". "
    //   })
    //     searchText.push(text)
    //



// ========== WATSON API  ===========
        // var parameters = {
        //   extract: 'entities, concepts, doc-sentiment, doc-emotion, keywords',
        //   text: searchText
        // };
        // alchemy_language.combined(parameters, function (err, response) {
        //   if (err)
        //     console.log('error:', err);
        //   else
        //     console.log(JSON.stringify(response, null, 2));
        //     res.json(response);
        // });
      // })
  }
}

module.exports = tweetController;
