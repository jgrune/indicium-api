//hello world
//requiring dependencies
var mongoose = require("./db/schema");
var express = require("express");
var parser = require("body-parser")
var MonkeyLearn = require('monkeylearn');
var cors = require('cors')
var app = express();

//enable cors
app.use(cors());

//linking both mongoose models
var Tweet = mongoose.model("Tweet")
var Search = mongoose.model("Search")

//setting body parser for form submissions
app.use(parser.json({extended: true}));

//setting up port
app.listen(4000), () => {
  console.log("app listening on port 4000");
}

//routes for express

// app.get("/", (req,res) => {
//     res.sendFile(__dirname + '/public/js/ng-views/index.html')
// })

app.get("/api/tweets", (req,res) => {
  Tweet.find({}).then((tweets) => {
    res.json(tweets)
  })
})

app.get("/api/tweets/:search", (req,res) => {
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
})

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
