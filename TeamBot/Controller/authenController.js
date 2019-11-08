var express = require('express');
var db = require('./databaseController');
var github = require('./githubController');
var authen = require('../routes/authen');

/*
handle request of authentication
TODO 1. get username(mgr) token & organization & mattermost channel
TODO 2. test -- mock

3. list of user in this github org and mattermost channel -- mock
4. link success page

5. store to db
 */

// save the authen data to db
var record = [authen.orgName, authen.token];
// var record = ['510-test',  '64c541d6d9a692b126ecb75067ee8d29258a6c86'];
db.insertRecordIntoOrganization(record);

// var user_lists = [];
// var users = github.userInOrg(record[0], record[1]).then(result=>{
//     // console.log(JSON.parse(result));
    
//     var parsedResult = JSON.parse(result);
//     for (var i=0; i<parsedResult.length; i = i+1){
//         user_lists.push(parsedResult[i].login);
//     }
//     console.log(user_lists);   
// });

// var role = github.checkUserRole(record[0], 'hwu23', record[1]).then(result=>{
//     var parsedResult = JSON.parse(result);
//     console.log(parsedResult.role);
// });


module.exports.token = record[1];
module.exports.orgName = record[0];