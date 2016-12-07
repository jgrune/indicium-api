var mongoose = require('../db/schema.js')
var keys = require("../keys.js")
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: keys.watson
});
var TweetModel = require('../models/tweet')

// ===== TWITTER API ./i=======
var Twit = require('twit')

//select number of tweets you want returned
var numTweets = 1;

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
    let responseObject = {
      tweets: [],
      watsonResponse: {}
    }
    let tweets = rawData.data.statuses.map((tweetData) => {
      return (
        new TweetModel(tweetData.text, tweetData.created_at, tweetData.user.screen_name, tweetData.retweet_count, tweetData.favorite_count, tweetData.user.profile_image_url_https)
      )
    })

    responseObject.tweets = tweets
    return responseObject
  })
  return cleanData
}

// ======= TWEET CONTROLLER ============

var tweetController = {
  index: (req,res) => {
    Tweet.find({}).then((tweets) => {
      res.json(tweets)
    })
  },
  show: (req,res) => {

    var searchText = [];
    var text = "";

    getTweets(req.params.search).then((responseObject) => {
      responseObject.tweets.forEach((tweet, i) => {
        text += tweet.text + ". "
      })

    // create single concatenated string of tweets to be consumed by watson API
      searchText.push(text)

// ==============
//   WATSON API
// ==============
    var parameters = {
      extract: 'entities, concepts, doc-sentiment, doc-emotion, keywords',
      text: searchText
    };

    let stuff = alchemy_language.combined(parameters, function (err, watsonResults) {
      if (err)
        return {'error': err}
      else
        // console.log(JSON.stringify(watsonResults, null, 2))
        responseObject.watsonResponse = watsonResults
        res.json(responseObject);
        });
      })
    }
  }

module.exports = tweetController;
