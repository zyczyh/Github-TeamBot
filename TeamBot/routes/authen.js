var express = require('express');
var config = require('../config.json');
var mattermostController = require('../Controller/mattermostController');
var db = require('../Controller/databaseController');
var router = express.Router();
var ORGNAME;
var TOKEN;
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
   console.log('post');
   let token = req.body.token;
   let orgName = req.body.orgName;
   setToken(token);
   setOrgName(orgName);
   await db.insertRecordIntoOrganization([orgName, token]);
   console.log('inserted');
   var iurl = config.incoming_webhook_url;
   var team_id = config.team_id;
   await mattermostController.sendToAllTeamMembers(team_id, iurl);
   res.send({'status111123123': 'OK'});
});

function getToken() {
   return TOKEN;
}

function getOrgName() {
   return ORGNAME;
}

function setToken(token) {
   TOKEN = token;
}

function setOrgName(name) {
   ORGNAME = name;
}

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
exports.getToken = getToken;
exports.getOrgName = getOrgName;
