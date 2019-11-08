var express = require('express');
var router = express.Router();

/*
GET authentication page
 */

router.get('/', (req, res) => {
   res.render('authentication');
});
//
// router.post('/', (req, res) => {
//
// });

router.post('/', async function(req, res, next) {
   var token = req.body.token;
   var orgName = req.body.orgName;
   console.log('token: ', token, '\norgName: ', orgName);
   var iurl = config.incoming_webhook_url;
   var team_id = config.team_id;
   await mattermostController.sendToAllTeamMembers(team_id, iurl);
   res.send({'status': 'OK'});
});

module.exports = router;
