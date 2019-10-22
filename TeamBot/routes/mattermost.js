var express = require('express');
var router = express.Router();
var mattermostController = require('../Controller/mattermostController'); 

/* GET home page. */
router.post('/mattermost', function(req, res, next) {
    console.log(req);
    res.send('aaaaa');
    //mattermostController.respondToUser(req);
});

router.delete('/test', function(req, res, next) {
  res.send('respond delete with a resource');
});

module.exports = router;
