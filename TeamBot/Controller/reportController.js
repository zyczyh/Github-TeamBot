/**
 * provide data for manager report and user report
 */
var express = require('express');
var db = require('./databaseController');
// var db = require('../test/mock/mockController');
var config = require('../config');
var mngrReportLinkHead = config.host + "/manager-report";
var userReportLinkHead = config.host + "/user-report";

/**
 * generate report links for both mngr and user
 * @return {mattermost_username: link}
 * @return eg: {'mngr1': 'host+/manager-report/mngr1/2019-10-28'}
 */
async function generateReportLinks(org_id) {
    var today = formatDate(new Date());
    var mngrs = db.listMngrGithubNameByOrgId(org_id);
    var users = db.listUserGithubNameByOrgId(org_id);
    var links = {};
    for (var mngr of mngrs) {
        var mName = await db.getMattermostNameByGithubName(mngr);
        links[mName] = mngrReportLinkHead + '/' + mngr + '/' + today;
    }
    for (var user of users) {
        var mName = await db.getMattermostNameByGithubName(user);
        links[mName] = userReportLinkHead + '/' + user + '/' + today;
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

function getNWeeksBeforeDate(n, date = new Date()) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var nowDate = date.getDate();
    var lastNWeek = new Date(year, month, nowDate - (n * 7));
    return lastNWeek;
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

/**
 * generate all data for front end to present manager's report
 * @param mngrName github_username
 * @param date
 * @returns Mngr report data
 * {
 *     {array} outline: user has 0 commits last week
 *
 *     {dic} weekCommits: commits# in last week
 *     {int} lastMonthCommits: commits# in last 4 weeks
 *     {int} monthCommitsDelta: lastMonthCommits# - theMonthBeforeCommits#
 *
 *     {array} weekLineDelta: code line delta
 *     {int} lastMonthLineDelta: sum(lineDelta#) in last 4 weeks
 *     {int} monthLineDelta: lastMonthLineDelta - theMonthBeforeLineDelta
 *
 *     {array} weekPulls: pull request # in last 8 weeks
 *     {int} lastMonthPulls: pull request # in last 4 weeks
 *     {int} monthPullsDelta: lastMonthPulls# - theMonthBeforeCommits#
 *
 *     {dic} weekCommitsByRepo: commits# for each repo
 *     {dic} weekLinesByRepo: lastWeekDelta for each repo
 *     {dic} weekPullsByRepo: pull request # for each repo
 *
 *     {dic} weekUserCommits:
 *     {dic} weekUserLines:
 *     {dic} weekUserPulls:
 * }
 */
async function mngrReportDate(mngrName, date = new Date()) {
    var outline = [];
    var weekCommits = {};
    var weekLineDelta = {};
    var weekPulls = {};
    var lastMonthCommits = 0;
    var lastMonthLineDelta = 0;
    var lastMonthPulls = 0;
    var monthCommitsDelta = 0;
    var monthLineDelta = 0;
    var monthPullsDelta = 0;
    var weekCommitsByRepo = {};
    var weekLinesByRepo = {};
    var weekPullsByRepo = {};
    var weekUserCommits = {};
    var weekUserLines = {};
    var weekUserPulls = {};

    var users = db.listGithubNameInSameOrg(mngrName);
    for (var userName of users) {
        var userData = userReportData(userName, date);
        if (userData['weekCommits'][date] === 0) {
            outline.push(userName);
        }
        weekCommits = {queryDate: 0};
        weekLineDelta = {queryDate: 0};
        weekPulls = {queryDate: 0};
        for (var i = 0; i < 8; i++) {
            var queryDate = getNWeeksBeforeDate(i, date);
            weekCommits[queryDate] += userData['weekCommits'][queryDate];
            weekLineDelta[queryDate] += userData['weekLineDelta'][queryDate];
            weekPulls[queryDate] += userData['weekPulls'][queryDate];
            if (i < 4) {
                if (i === 0) {
                    weekUserCommits[userName] = userData['weekCommits'][queryDate];
                    weekUserLines[userName] = userData['weekLineDelta'][queryDate];
                    weekUserPulls[userName] = userData['weekPulls'][queryDate];
                }
                lastMonthCommits += userData['weekCommits'][queryDate];
                lastMonthLineDelta += userData['weekLineDelta'][queryDate];
                lastMonthPulls += userData['weekPulls'][queryDate];

                monthCommitsDelta += userData['weekCommits'][queryDate];
                monthLineDelta += userData['weekLineDelta'][queryDate];
                monthPullsDelta += userData['weekPulls'][queryDate];
            } else {
                monthCommitsDelta -= userData['weekCommits'][queryDate];
                monthLineDelta -= userData['weekLineDelta'][queryDate];
                monthPullsDelta -= userData['weekPulls'][queryDate];
            }
        }

        for (var repo in userData['commitsByRepo']) {
            if (weekCommitsByRepo.hasOwnProperty(repo)) {
                weekCommitsByRepo[repo] += userData['commitsByRepo'][repo];
            } else {
                weekCommitsByRepo[repo] = userData['commitsByRepo'][repo];
            }
        }
        for (var repo in userData['linesByRepo']) {
            if (weekLinesByRepo.hasOwnProperty(repo)) {
                weekLinesByRepo[repo] += userData['linesByRepo'][repo];
            } else {
                weekLinesByRepo[repo] = userData['linesByRepo'][repo];
            }
        }
        for (var repo in userData['pullsByRepo']) {
            if (weekPullsByRepo.hasOwnProperty(repo)) {
                weekPullsByRepo[repo] += userData['pullsByRepo'][repo];
            } else {
                weekPullsByRepo[repo] = userData['pullsByRepo'][repo];
            }
        }
    }
    return {
        'outline': outline,
        'weekCommits': weekCommits,
        'weekLineDelta': weekLineDelta,
        'weekPulls': weekPulls,
        'lastMonthCommits': lastMonthCommits,
        'lastMonthLineDelta': lastMonthLineDelta,
        'lastMonthPulls': lastMonthPulls,
        'monthCommitsDelta': monthCommitsDelta,
        'monthLineDelta': monthLineDelta,
        'monthPullsDelta': monthPullsDelta,
        'weekCommitsByRepo': weekCommitsByRepo,
        'weekLinesByRepo': weekLinesByRepo,
        'weekPullsByRepo': weekPullsByRepo,
        'weekUserCommits': weekUserCommits,
        'weekUserLines': weekUserLines,
        'weekUserPulls': weekUserPulls
    }
}

/**
 * generate all data for front end to present user's report
 * @param userName github_username
 * @param date query date
 * @return User report data
 * {
 *     {double} outline: user_commits# / team_commits# this week
 *
 *     {dic} weekCommits: commits# in last 8 weeks
 *     {int} lastMonthCommits: commits# in last 4 weeks
 *     {int} monthCommitsDelta: lastMonthCommits# - theMonthBeforeCommits#
 *
 *     {dic} weekLineDelta: code line delta
 *     {int} lastMonthLineDelta: sum(lineDelta#) in last 4 weeks
 *     {int} monthLineDelta: lastMonthLineDelta - theMonthBeforeLineDelta
 *
 *     {dic} weekPulls: pull request # in last 8 weeks
 *     {int} lastMonthPulls: pull request # in last 4 weeks
 *     {int} monthPullsDelta: lastMonthPulls# - theMonthBeforeCommits#
 *
 *     {Dic} CommitsByRepo: {repo1: #commits, repo2: #commits, … repo4: #commits}
 *     {Dic} LinesByRepo: {repo1: #codes, repo2: #codes, … repo4: #codes}
 *     {Dic} PullsByRepo: {repo1: #pull, repo2: #pull, … repo4: #pull}
 * }
 */
async function userReportData(userName, date = new Date()) {

    var outline = [];
    var weekCommits = {};
    var weekLineDelta = {};
    var weekPulls = {};
    var lastMonthCommits = 0;
    var lastMonthLineDelta = 0;
    var lastMonthPulls = 0;
    var monthCommitsDelta = 0;
    var monthLineDelta = 0;
    var monthPullsDelta = 0;
    var commitsByRepo = {};
    var linesByRepo = {};
    var pullsByRepo = {};


    for (var i = 0; i < 8; i++) {
        var queryDate = getNWeeksBeforeDate(i, date);

        var data = await db.getStatisticsByUserAndDate(userName, queryDate);
        weekCommits = {queryDate: 0};
        weekLineDelta = {queryDate: 0};
        weekPulls = {queryDate: 0};

        for (var j = 0; j < data.length; j++) {
            weekCommits[queryDate] += data[i]['commits_number'];
            weekLineDelta[queryDate] += data[i]['codelines_change'];
            weekPulls[queryDate] += data[i]['pullrequest_number'];

            if (i < 4) {
                if (i === 0) {
                    commitsByRepo[data[i]['repo_name']] = data[i]['commits_number'];
                    linesByRepo[data[i]['repo_name']] = data[i]['codelines_change'];
                    pullsByRepo[data[i]['repo_name']] = data[i]['pullrequest_number'];
                }
                lastMonthCommits += data[i]['commits_number'];
                lastMonthLineDelta += data[i]['codelines_change'];
                lastMonthPulls += data[i]['pullrequest_number'];

                monthCommitsDelta += data[i]['commits_number'];
                monthLineDelta += data[i]['codelines_change'];
                monthPullsDelta += data[i]['pullrequest_number'];
            } else {
                monthCommitsDelta -= data[i]['commits_number'];
                monthLineDelta -= data[i]['codelines_change'];
                monthPullsDelta -= data[i]['pullrequest_number'];
            }
        }


    }

    return {
        'outline': outline,
        'weekCommits': weekCommits,
        'weekLineDelta': weekLineDelta,
        'weekPulls': weekPulls,
        'lastMonthCommits': lastMonthCommits,
        'lastMonthLineDelta': lastMonthLineDelta,
        'lastMonthPulls': lastMonthPulls,
        'monthCommitsDelta': monthCommitsDelta,
        'monthLineDelta': monthLineDelta,
        'monthPullsDelta': monthPullsDelta,
        'commitsByRepo': commitsByRepo,
        'linesByRepo': linesByRepo,
        'pullsByRepo': pullsByRepo
    }
}

/**
 * help functions for generate user's report
 */
// @return higher than ??% coworkers
async function outlineByUser(userName, date) {
    var orgId = await db.getOrgIdByMName(userName);
    var orgUserNum = await db.countOrgUserNum(orgId);

    var userNumLessThan = await db.countLessCommitUser(userName, orgId, date);

    return userNumLessThan / orgUserNum;
}

// outlineByUser('zyc');

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

exports.getNWeeksBeforeDate = getNWeeksBeforeDate;
