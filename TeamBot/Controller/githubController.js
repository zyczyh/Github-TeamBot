var express = require('express');
var dbController = require('./databaseController');


express.repoList = function (req, res, next) {
    return express.json(repos);
};

function userInOrg(orgName) {
    
}

// report data
function getCommits() {
    // TODO call github api

    // store to database

}

function getIssues() {
    // TODO call github api

    // store to db

}






