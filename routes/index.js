var express = require('express');
var router = express.Router();
var paper = require("../controllers/PaperController.js");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res) {
  res.render('add', { title: 'Add Paper' });
});

router.get('/edit', function(req, res) {
  res.render('edit', { title: 'Edit Paper Entry' });
});

router.get('/remove', function(req, res) {
  res.render('remove', { title: 'Remove Paper' });
});

// Get all items
router.get('/list', paper.list);

module.exports = router;
