var express = require('express');
var router = express.Router();

/*
GET authentication page
 */

router.get('/', (req, res) => {
    res.render('manager-report');
});

// router.post('/', (req, res) => {
//     var token = req.body.token;
//     var orgName = req.body.orgName;
//     console.log('token: ', token, '\norgName: ', orgName);
// });

module.exports = router;
