var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * manager report link: host/manager-report/
 */

router.get('/:name/:date', (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var data = report.getReportData(name, date);
    res.render("manager-report",
        {outline: data['outline'],
            weekCommits: data['weekCommits'],
            weekLineDelta: data['weekLineDelta'],
            weekPulls: data['weekPulls'],
            lastMonthCommits: data['lastMonthCommits'],
            lastMonthLineDelta: data['lastMonthLineDelta'],
            lastMonthPulls: data['lastMonthPulls'],
            monthCommitsDelta: data['monthCommitsDelta'],
            monthLineDelta: data['monthLineDelta'],
            monthPullsDelta: data['monthPullsDelta'],
            weekCommitsByRepo: data['weekCommitsByRepo'],
            weekLinesByRepo: data['weekLinesByRepo'],
            weekPullsByRepo: data['weekPullsByRepo'],
            weekUserCommits: data['weekUserCommits'],
            weekUserLines: data['weekUserLines'],
            weekUserPulls: data['weekUserPulls']});

});


module.exports = router;
