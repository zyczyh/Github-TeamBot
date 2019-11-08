var github = require('./githubController');
var report = require('./reportController');
var mattermost = require('./mattermostController');
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
    schedule.scheduleJob('0 56 0 * * 5', async function() {
        console.log('scheduleCronstyle:' + new Date());
        // // fetch data from github and store into db
        await github.fetchData();
    });

    schedule.scheduleJob('0 56 0 * * 5', async function() {
        // generate all weekly reports
        var reportLinks = report.generateReportLinks();
        // console.log(reportLinks);

        // Send report links
        for (var user in reportLinks) {
            await mattermost.postReports(config.incoming_webhook_url, '@' + user, reportLinks[user]);
        }
    }); 
  }

exports.logout = function logOut() {
    $.post("/logout").then(function(data) {
        window.location = data.redirectUrl;
    });
};

exports.weeklyReports = weeklyReports;