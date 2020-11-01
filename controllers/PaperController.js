var mongoose = require("mongoose");
var mongo = require("mongodb");
var Papers = mongoose.model("Papers");

var PapersController = {};

// Show list of all items
PapersController.list = function(req, res) {
    Papers.find({"title": {$exists: true}},
      function (err, papers) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            console.log(papers)
            res.send(papers);
        }
      }
    );
  };

  module.exports = PapersController;