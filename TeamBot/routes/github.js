var express = require('express');
var router = express.Router();
var gitHubController = require('../Controller/githubController');


/* Present github repos */
// router.get('/test/:id', function(req, res, next) {
//     var content = repos;
//     res.render('github', {repos: repos});
// });
//
// router.delete('/test', function(req, res, next) {
//     res.send('respond delete with a resource');
// });

module.exports = router;
