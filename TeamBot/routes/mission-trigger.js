var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
var jade = require('jade'),
    fs = require('fs');
var app = express()

// var reportController = require('reportController');
// var upload = multer();
//
// router.get('/', (req, res) => {
// });

app.use(express.urlencoded())
app.get('/mission-trigger', (req, res) => {
    res.render('test/mission-trigger');
})

app.post('/submit-form', (req, res) => {
    report.analysis();
})


module.exports = router;