var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mock');

function analysis() {
    var AC = db.getAllCommits;

    var sUserCommits = userCommitCounts(AC);

    return sUserCommits;
}

function userCommitCounts(AC) {
    commits = {};

    for (commit of AC) {
        var name = commit.commit.author.name;
        if (!(name in commits)) {
            commits[name] += 1;
        } else {
            commits[name] = 1;
        }
    }

    var sCommits = Object.keys(commits).sort(function(a, b){return commits[a] - commits[b]});
    return sCommits;
}

exports.analysis = analysis;