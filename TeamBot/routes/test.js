var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/* GET home page. */
router.get('/', function(req, res, next) {
    var data = report.analysis();
    res.render('test', { data: data});
});
// router.get('/', (req, res) => {
//     res.render('missionTrigger');
// });

router.get('/mission-trigger', function (req, res, next) {
    res.render('test/mission-trigger');
    
});

router.post('/mission-trigger', function (req, res, next) {
    report.analysis();
});
module.exports = router;