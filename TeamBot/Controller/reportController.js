var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mock');

function generatALLReport() {
    /**
     * generate all reports here
     * return a dict {@username: reportURL}
     */
    var AC = db.getAllCommits;

    var commitsWithUserList = userCommitCounts(AC);

    return commitsWithUserList;
}


function userCommitCounts(AC) {
    commits = {};

    for (commit of AC) {
        var name = commit.commit.author.name;
        if (name in commits) {
            commits[name] += 1;
        } else {
            commits[name] = 1;
        }
    }

    var users = Object.keys(commits).sort(function(a, b){return commits[a] - commits[b]});
    return [users, commits];
}

exports.generatALLReport = generatALLReport;