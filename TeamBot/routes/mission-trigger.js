var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
var jade = require('jade'),
    fs = require('fs');
var mission = require('../Controller/missionController');

// var reportController = require('reportController');
// var upload = multer();
//
// router.get('/', (req, res) => {
// });

// app.use(express.urlencoded());
router.get('/mission-trigger', (req, res) => {
    res.render('test/mission-trigger');
});

router.post('/submit-form', (req, res) => {
    console.log('get post request');
    mission.weeklyReport();
});


module.exports = router;