var mongoose = require("mongoose");
var mongo = require("mongodb");
var Papers = mongoose.model("Papers");

var PapersController = {};

// Return List of All Items
PapersController.list = function (req, res) {
  Papers.find({ "title": { $exists: true } },
    function (err, papers) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(papers)
        res.send(papers);
      }
    });
};

// Return List of Items that Match Search Query
PapersController.search = function (req, res) {
  var regexEx = new RegExp(req.query.srch, "i");
  Papers.find(
    {
      $or: [{ "title": regexEx },
      { "authors": regexEx },
      { "journal": regexEx },
      { "tags": regexEx }]
    },
    function (err, papers) {
      if (err) {
        console.log("Search Error: " + err);
        res.sendStatus(500);
      }
      else {
        console.log(papers);
        res.send(papers);
      }
    }
  );
};

module.exports = PapersController;