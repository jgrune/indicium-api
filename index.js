//requiring dependencies
var mongoose = require("./db/schema");
var express = require("express");
var parser = require("body-parser")
var app = express();

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
  Tweet.find({
    body: new RegExp(req.params.search, "i")
  }).then((tweets) => {
        res.json(tweets)
      })
  })
