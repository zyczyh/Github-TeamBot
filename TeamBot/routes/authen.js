var express = require('express');
var router = express.Router();

/*
GET authentication page
 */

 var token;
 var orgName;
 
router.get('/', (req, res) => {
   res.render('authentication');
});

router.post('/', (req, res) => {
   token = req.body.token;
   orgName = req.body.orgName;
   if(typeof token === 'undefined' || typeof orgName === 'undefined'){
      res.status(400).json({ error: 'missing parameter', data: null }); 
      return;
    }
  
   res.status(200).json({ error: null, data: [token, orgName] });
});

module.exports = router;
module.exports.token = token;
module.exports.orgName = orgName;
