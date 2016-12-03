//choose number of tweets here - max is 363 for starwars quotes
var numTweets = 363;
//=====================

// var faker = require('faker');
var starwars = require('starwars');
var tweetArray = [];

//starwars tweets
for (i = 0; i < numTweets; i++){
    tweetArray.push(
      {
        body: starwars()
      }
    )
  }

//faker tweets
// for (i = 0; i < numTweets; i++){
//     tweetArray.push(
//       {
//         body: faker.fake("{{hacker.phrase}}")
//       },
//       {
//         body: faker.fake("{{company.catchPhrase}}")
//       }
//     )
//   }

module.exports = tweetArray;
