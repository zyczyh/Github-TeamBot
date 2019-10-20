var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = report.analysis();
    res.render('test', { data: data});
});

module.exports = router;