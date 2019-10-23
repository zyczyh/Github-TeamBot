var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * user report link: host/user-report/
 */

router.get('/:name/:date', (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var data = report.userReportData(name, date);
    var generateReportLinks =  exports.generateReportLinks;
    var userReportData = exports.userReportData;
    // exports.getReportData = mngrReportDate;
    res.render('user-report', {data: data, userReportData: userReportData});
});

module.exports = router;
