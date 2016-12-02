var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/indicium');

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
})

db.once('open', function(){
  console.log("Connected to Indicium DB via MongoDB");
})

var Schema = mongoose.Schema

var TweetSchema = new Schema({
  body: String
})

var SearchSchema = new Schema({
  body: String
})

mongoose.model("Tweet", TweetSchema);
mongoose.model("Search", SearchSchema)

module.exports = mongoose;
