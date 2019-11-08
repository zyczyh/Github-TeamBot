var github = require('./githubController');
var report = require('./reportController');
var mattermost = require('./mattermostController');
var db = require('./databaseController');
var config = require('../config');
var schedule = require('node-schedule');

/**
 * run weekly mission
 * 1. fetch data from github
 * 2. generate links for all users
 * 3. post link for user to mattermost
 * @param repoName
 */

// schedule weekly tasks
function weeklyReports(){
        github.fetchData();
    // schedule.scheduleJob('0 56 0 * * 5', async function() {
    //     console.log('scheduleCronstyle:' + new Date());
    //     // // fetch data from github and store into db
    //     await github.fetchData();
    // });
    //
    // schedule.scheduleJob('0 56 0 * * 5', async function() {
    //     // generate all weekly reports
    //     var orgList = db.listAllOrgId();
    //     for (var org_id of orgList) {
    //         var reportLinks = report.generateReportLinks(org_id);
    //         // console.log(reportLinks);
    //         // Send report links
    //         for (var user in reportLinks) {
    //             mattermost.postReports(config.incoming_webhook_url, '@' + user, reportLinks[user]);
    //         }
    //     }
    // });
  }

exports.logout = function logOut() {
    $.post("/logout").then(function(data) {
        window.location = data.redirectUrl;
    });
};

exports.weeklyReports = weeklyReports;