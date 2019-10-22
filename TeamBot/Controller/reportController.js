/**
 * provide data for manager report and user report
 */
var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mock');

function generateAllReports() {
    /**
     * generate all reports here
     * return a dict {@username: reportURL}
     */
    var AC = db.getAllCommits;

    var commitsWithUserList = allCommitCounts(AC);

    return commitsWithUserList;
}


function allCommitCounts(AC) {
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

/**
 * generate all data for front end to present user's report
 * @param username username
 * @param date query date
 * @return {currentCommits: array(list of time),
 *          lastWeekCommits: array(list of time),
 *          redFlag: boolean,
 *          message: String}
 */
function userReportData(username, date) {

    var data = {};

    return data;
}

function userCommits(AC, username, date) {

}

exports.userReportData = userReportData;
exports.generateAllReports = generateAllReports;