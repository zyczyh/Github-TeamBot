var express = require('express');
// var db = require('./databaseController');
var dbController = require('../test/mock/mock');
var github = require('../Controller/githubController');
var report = require('./reportController');
var mattermost = require('./mattermostController');
var incomingHookLink = 'https://csc510-mattermost-19.herokuapp.com/hooks/9o3owumwgtgiiez9h496ijwd4o';

/**
 . listen to timer
 . fetch data from github -- githubController
 . generate report -- reportController
 . publish report -- mattermostController
 */

/**
 * generate report data for repoName
 * @param repoName
 */
function weeklyReport(repoName) {
    // fetch data from github and store into db
    github.fetchData();

    // generate all weekly reports
    var reports = report.generatALLReport();

    for (var user in reports) {
        mattermost.postReports(incomingHookLink, user, reports[user]);
    }
}


exports.weeklyReport = weeklyReport;