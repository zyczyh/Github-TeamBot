var express = require('express');
var router = express.Router();

/*
GET authentication page
 */
// var findUserByUsername = function (username, callback) {
//     // Perform database query that calls callback when it's done
//     // This is our fake database
//     if (!users[username])
//         return callback(new Error(
//             'No user matching '
//             + username
//             )
//         );
//     return callback(null, users[username]);
// };
//
// app.get('/v1/users/:username', function(request, response, next) {
//     var username = request.params.username;
//     findUserByUsername(username, function(error, user) {
//         if (error) return next(error);
//         return response.render('user', user);
//     });
// });
//
// app.get('/v1/admin/:username', function(request, response, next) {
//     var username = request.params.username;
//     findUserByUsername(username, function(error, user) {
//         if (error) return next(error);
//         return response.render('admin', user);
//     });
// });
router.get('/', (req, res) => {
    res.render('manager-report');
});

// router.post('/', (req, res) => {
//     var token = req.body.token;
//     var orgName = req.body.orgName;
//     console.log('token: ', token, '\norgName: ', orgName);
// });

module.exports = router;
