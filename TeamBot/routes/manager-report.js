var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');

router.get('/:name/:date', (req, res) => {
    var name = req.params.name;
    var date = req.params.date;

    var commit_users = report.generatALLReport()[0];
    var user_count = commit_users.length;
    var commit_dict = report.generatALLReport()[1];

    res.render('manager-report', {commit_users: commit_users, user_count:user_count, commit_dict:commit_dict});
});


module.exports = router;
