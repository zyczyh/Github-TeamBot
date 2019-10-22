var express = require('express');
var db = require('./mock');

exports.getAllCommits = function (repoName) {
    return db.getAllCommits;
};

exports.getAllUsers = function () {
    return db.getAllUsers;
};

exports.getAllMngrs = function () {
    return db.getAllMngrs;
};

exports.getUserCommitsInAWeek = function (user, startDate, endDate) {
    var AC = exports.getAllCommits();
    var commitsTime = [];
    console.log(startDate);

    for (var commit of AC) {
        if (commit.commit.author.name === user) {
            var commitTime = new Date(commit.commit.author.date);
            console.log(commitTime.getTime());
            if (commitTime.getTime() < endDate.getTime() && commitTime.getTime() > startDate.getTime()) {
                commitsTime.push(commitTime);
            }
        }
    }
    return commitsTime;
};
