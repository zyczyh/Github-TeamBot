var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * manager report link: host/manager-report/
 */

router.get('/:name/:date', (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var commit_users = report.getReportData(name, date)[0];
    var user_count = commit_users.length;
    var commit_dict = report.getReportData(name, date)[1];

    res.render('manager-report', {commit_users: commit_users, user_count:user_count, commit_dict:commit_dict});
});


module.exports = router;
