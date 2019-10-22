var express = require('express');
var dbController = require('./databaseController');

function fetchData() {
    /**
     * update all needs data from github
     * store into db
     */
    getCommits();
    getIssues();
}

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

exports.fetchData = fetchData;
exports.getCommits = getCommits;






