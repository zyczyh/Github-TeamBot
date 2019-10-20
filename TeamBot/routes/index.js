var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.delete('/test', function(req, res, next) {
//   res.send('respond delete with a resource');
// });

module.exports = router;
