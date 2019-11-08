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

    res.render('user-report',
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
        CommitsByRepo: data['CommitsByRepo'],
        LinesByRepo: data['LinesByRepo'],
        PullsByRepo: data['PullsByRepo']});
});

module.exports = router;
