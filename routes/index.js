var express = require('express');
var router = express.Router();
var paper = require("../controllers/PaperController.js");

// Get Home Page
router.get('/', function (req, res) {
  res.render('index', { title: 'Home' });
});

// Get Add Paper Page
router.get('/add', function (req, res) {
  res.render('add', { title: 'Add Paper' });
});

// Get Edit Paper Page
router.get('/edit', function (req, res) {
  res.render('edit', { title: 'Edit Paper Entry' });
});

//. Get Remove Paper Page
router.get('/remove', function (req, res) {
  res.render('remove', { title: 'Remove Paper' });
});

// Query All Items from Database
router.get('/list', paper.list);

// Query Search for Items from Database
router.get('/search', paper.search);

module.exports = router;