var mongoose = require('../db/schema.js')
var Search = mongoose.model("Search")

var searchController = {
  new: (req, res) => {
    Search.create(req.body).then((search) => {
      res.json(search)
    })
  }
}

module.exports = searchController;
