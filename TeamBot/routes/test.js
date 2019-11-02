// var express = require('express');
// var router = express.Router();
// var report = require('../Controller/reportController');
// var mission = require('../Controller/missionController');
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     var data = report.analysis();
//     res.render('test', { data: data});
// });
//
// router.get('/mission-trigger', function (req, res, next) {
//     res.render('test/mission-trigger');
// });
//
// router.post('/mission-trigger', function (req, res, next) {
//     mission.weeklyReport();
// });
//
// module.exports = router;

var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
var mission = require('../Controller/missionController');

/* GET home page. */
router.get('/', function(req, res, next) {
    // var data = report.analysis();
    res.render('test', { data: data});
});

router.get('/mission-trigger', function (req, res, next) {
    res.render('test/mission-trigger');
});
// function logOut() {
//     $.post("/logout").then(function(data) {
//         window.location = data.redirectUrl;
//     });
// };
router.post('/logout', function (req, res, next) {
    mission.weeklyReport();
    // res.logOut();
    // res.logout();
    // req.session.destroy();
    // res.send({err: 0, redirectUrl: "test/mission-trigger"});
    // res.render('test/mission-trigger');
    res.redirect(307, 'test/mission-trigger');
});

module.exports = router;