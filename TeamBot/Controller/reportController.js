/**
 * provide data for manager report and user report
 */
var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mock');
var config = require('../config');
var mngrReportLinkHead = host + "/manager-report";
var userReportLinkHead = host + "/user-report";

function generateReportLinks() {
    var today = formatDate(new Date());
    var mngrs = db.getAllMngrs;
    var users = db.getAllUsers;
    var links = {};
    for (var mngr of mngrs) {
        links[mngr] = mngrReportLinkHead + '/' + mngr + '/' + today;
    }
    for (var user of users) {
        links[user] = userReportLinkHead + '/' + user + '/' + today;
    }

    return links;
}

function weekDate(date = new Date()) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var nowDate = date.getDate();
    var day = date.getDay();
    var beginDate = new Date(year, month, nowDate - day);
    var endDate = new Date(year, month, nowDate + 6 - day);
    beginDate = formatDate(beginDate);
    endDate = formatDate(endDate);
    return [beginDate, endDate];
}

function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
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

function getReportData(name, date) {
    /**
     * generate all reports here
     * return a dict {@username: reportURL}
     */
    var AC = db.getAllCommits;

    var commitsWithUserList = allCommitCounts(AC);

    return commitsWithUserList;
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

exports.generateReportLinks = generateReportLinks;
exports.userReportData = userReportData;
exports.getReportData = getReportData;