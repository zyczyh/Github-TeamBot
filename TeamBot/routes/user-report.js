var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * user report link: host/user-report/
 */

router.get('/:name/:date', async (req, res) => {
    var name = req.params.name;
    // var date = req.params.date;

    var data = await report.userReportData(name);
    console.log("data in user-report: ", data);

    res.render('user-report',
        {
            data:data,
            outline: data['outline'],
            weekCommits: report.sortOnKeys(data['weekCommits'], "Week", "Commits"),
            weekLineDelta: report.sortOnKeys(data['weekLineDelta'], "Week", "LineDelta"),
            weekPulls: report.sortOnKeys(data['weekPulls'], "Week", "Pulls"),
            lastMonthCommits: data['lastMonthCommits'],
            lastMonthLineDelta: data['lastMonthLineDelta'],
            lastMonthPulls: data['lastMonthPulls'],
            monthCommitsDelta: data['monthCommitsDelta'],
            monthLineDelta: data['monthLineDelta'],
            monthPullsDelta: data['monthPullsDelta'],
            commitsByRepo: report.sortOnKeys(data['commitsByRepo'], "Repo", "Commits"),
            linesByRepo: report.sortOnKeys(data['linesByRepo'], "Repo", "Lines"),
            pullsByRepo: report.sortOnKeys(data['pullsByRepo'], "Repo", "Pulls")
        });
});


module.exports = router;
