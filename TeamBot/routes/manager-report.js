var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * manager report link: host/manager-report/
 */

router.get('/:name/:date', (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var weekCommits = report.getReportData(name, date)["weekCommits"];
    // var user_count = commit_users.length;
    // var commit_dict = report.getReportData(name, date)[1];

    res.render('manager-report', {weekCommits: weekCommits});
});


module.exports = router;
