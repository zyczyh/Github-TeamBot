var express = require('express');
var router = express.Router();
var report = require('../Controller/reportController');

router.get('/', (req, res) => {
    var commit_users = report.analysis()[0];
    var user_count = commit_users.length;
    var commit_dict = report.analysis()[1];
    res.render('manager-report', {commit_users: commit_users, user_count:user_count, commit_dict:commit_dict});
});



// router.post('/', (req, res) => {
//     var token = req.body.token;
//     var orgName = req.body.orgName;
//     console.log('token: ', token, '\norgName: ', orgName);
// });

module.exports = router;
