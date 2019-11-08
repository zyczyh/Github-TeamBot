var express = require('express');
var config = require('../config.json');
var mattermostController = require('../Controller/mattermostController');
var db = require('../Controller/databaseController');
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
   let token = req.body.token;
   let orgName = req.body.orgName;
   await db.insertRecordIntoOrganization([orgName, token]);
   var iurl = config.incoming_webhook_url;
   var team_id = config.team_id;
   await mattermostController.sendToAllTeamMembers(team_id, iurl);
   res.send({'status': 'OK'});
});

// router.post('/', (req, res) => {
//    token = req.body.token;
//    orgName = req.body.orgName;
//    if(typeof token === 'undefined' || typeof orgName === 'undefined'){
//       res.status(400).json({ error: 'missing parameter', data: null }); 
//       return;
//     }
  
//    res.status(200).json({ error: null, data: [token, orgName] });
// });

module.exports = router;
