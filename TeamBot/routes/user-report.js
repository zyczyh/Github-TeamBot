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

    res.render('user-report', {data: data});
});

module.exports = router;
