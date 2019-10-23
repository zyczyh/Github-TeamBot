var express = require('express');
var router = express.Router();
var mattermostController = require('../Controller/mattermostController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/mattermost', async function(req, res, next) {
    //console.log(req);
    mattermostController.respondToUser(req.body.text, req.body.user_name);
    res.send({'status': 'OK'});
});
router.post('/authen', async function(req, res, next) {
    var iurl = 'http://localhost:8065/hooks/jrmosxrretg43ki5et4sqsdgqa';
    var team_id = 'dtziu37n17dmpr59unppw4fmry';
    await mattermostController.sendToAllTeamMembers(team_id, iurl);
    res.send({'status': 'OK'});
});
router.delete('/test', function(req, res, next) {
  res.send('respond delete with a resource');
});

module.exports = router;
