/**
 * provide data for manager report and user report
 */
var express = require('express');
// var db = require('./databaseController');
var db = require('../test/mock/mockController');
var config = require('../config');
var mngrReportLinkHead = host + "/manager-report";
var userReportLinkHead = host + "/user-report";

/**
 * generate report links for both mngr and user
 * @return {username: link}
 * @return eg: {'mngr1': 'host+/manager-report/mngr1/2019-10-28'}
 */
function generateReportLinks() {
    var today = formatDate(new Date());
    var mngrs = db.getAllMngrs();
    var users = db.getAllUsers();
    var links = {};
    for (var mngr of mngrs) {
        links[mngr] = mngrReportLinkHead + '/' + mngr + '/' + today;
    }
    for (var user of users) {
        links[user] = userReportLinkHead + '/' + user + '/' + today;
    }

    return links;
}

/**
 * helper function to calculate start and end date of week of {date}
 * @param date set default to today
 * @returns {[any | Date, any | Date]}
 */
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

// End of helper functions

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

    var users = Object.keys(commits).sort(function (a, b) {
        return commits[a] - commits[b]
    });
    return [users, commits];
}

/**
 * generate all data for front end to present manager's report
 * @param name
 * @param date
 * @returns {[*, *]}
 */
function mngrReportDate(name, date) {

    var AC = db.getAllCommits();

    var commitsWithUserList = allCommitCounts(AC);

    return commitsWithUserList;
}

/**
 * generate all data for front end to present user's report
 * @param username username
 * @param date query date
 * @return {
 *          currentCommits: array(list of time),
 *          lastWeekCommits: array(list of time),
 *          redFlag: boolean,
 *          message: String
 * }
 */
function userReportData(username, date) {
    date = new Date(date);
    var currentWeekCommits = db.getUserCommitsInAWeek(username, new Date(weekDate(date)[0]), new Date(weekDate(date)[1]));
    var today = new Date();
    var lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDay() - 7);
    var lastWeekCommits = db.getUserCommitsInAWeek(username, new Date(weekDate(lastWeek)[0]), new Date(weekDate(lastWeek)[1]));
    var redFlag = checkRedFlag();
    var message = generateMessage();
    console.log({
        currentCommits: currentWeekCommits,
        lastWeekCommits: lastWeekCommits,
        redFlag: redFlag,
        message: message
    });
    return {
        currentCommits: currentWeekCommits,
        lastWeekCommits: lastWeekCommits,
        redFlag: redFlag,
        message: message
    };
}

/**
 * help functions for generate user's report
 * @returns {boolean}
 */
function checkRedFlag() {
    return false;
}

function generateMessage() {
    return "Good Job keep going";
}

// End of helper functions


exports.generateReportLinks = generateReportLinks;
exports.userReportData = userReportData;
exports.getReportData = mngrReportDate;