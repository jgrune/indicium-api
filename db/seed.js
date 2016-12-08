var mongoose = require("./schema.js");

var searchData = require("./seed_data/search_seeds.json");

var Search = mongoose.model("Search")

Search.remove({}).then(() => {
  Search.collection.insert(searchData).then(() => {
    process.exit();
  })
})
