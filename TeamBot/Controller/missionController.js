var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mock');
var report = require('./reportController');

/**
. listen to timer
. fetch data from github -- githubController
. generate report -- reportController
. publish report -- mattermostController
 */

/**
 * generate report data for repoName
 * @param repoName
 * @param db
 * @param report
 */
function weeklyReport(repoName, db, report) {
    report.anaylsis(db);

}