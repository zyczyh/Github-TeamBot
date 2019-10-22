var express = require('express');
// var db = require('./databaseController');
var dbController = require('../test/mock/mock');
var report = require('./reportController');
var mattermost = require('./mattermostController');

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
    report.analysis();

    var hostURL = 'https://csc510-mattermost-19.herokuapp.com/hooks/9o3owumwgtgiiez9h496ijwd4o';
    var data = {"text": "this is a test string"};
    mattermost.postReports(hostURL, data);
}


exports.weeklyReport = weeklyReport;