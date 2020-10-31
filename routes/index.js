var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/layout', function(req, res) {
  res.render('layout', { title: 'Express' });
});


module.exports = router;
