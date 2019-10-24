var github = require('../Controller/githubController');
var report = require('./reportController');
var mattermost = require('./mattermostController');
var incomingHookLink = 'https://csc510-mattermost-19.herokuapp.com/hooks/9o3owumwgtgiiez9h496ijwd4o';

/**
 * run weekly mission
 * 1. fetch data from github
 * 2. generate links for all users
 * 3. post link for user to mattermost
 * @param repoName
 */
exports.weeklyReport = function (repoName) {
    // fetch data from github and store into db
    github.fetchData();

    // generate all weekly reports
    var reportLinks = report.generateReportLinks();
    console.log(reportLinks);

    // Send report links
    for (var user in reportLinks) {
        mattermost.postReports(incomingHookLink, '@' + user, reportLinks[user]);
    }
};

exports.logout = function logOut() {
    $.post("/logout").then(function(data) {
        window.location = data.redirectUrl;
    });
};