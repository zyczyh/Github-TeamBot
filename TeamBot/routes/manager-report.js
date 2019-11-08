var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');
/**
 * manager report link: host/:manager-report/:date
 */

router.get('/:name/:date', async (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var data = await report.mngrReportDate(name, date);

    // res.render('manager-report', {commit_users: commit_users, user_count:user_count, commit_dict:commit_dict});
    res.render('test', {data: data});
});


module.exports = router;
