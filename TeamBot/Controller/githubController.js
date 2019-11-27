var express = require('express');
var request = require('request');
var db = require('./databaseController');
var github_api = require('../github_api');

// for (var i = 0; i < 6; i++) {
//     var date = new Date();
//     date.setDate(date.getDate() - i * 7);
//     fetchData(date);
// }

async function fetchData(curr_date=new Date()) {
    /**
     * update all needs data from github
     * store into db
     */
    console.log("*******fetching data********");
    var since = new Date(curr_date);
    since.setDate(since.getDate() - 7);
    // var curr_date = new Date(Date.now());
    var org_info = await db.getOrgInfoFromDb();
    // //console.log(org_info);
    for (var i = 0; i < org_info.length; i = i + 1) {
        var users_info = await db.getUserInfoByOrgFromDb(org_info[i].org_id);
        var repos_info = await github_api.getReposInOrg(org_info[i].org_name, org_info[i].github_token);
        //console.log(users_info);
        //console.log(repos_info);
        for (var j = 0; j < users_info.length; j = j + 1) {
            for (var k = 0; k < repos_info.length; k = k + 1) {
                //console.log(repos_info[0].name);
                var commits_info = await github_api.getCommits(org_info[i].org_name, repos_info[k].name, users_info[j].github_username, since.toISOString(), org_info[i].github_token);
                var PRs_info = await github_api.getPRs(org_info[i].org_name, repos_info[k].name, org_info[i].github_token);
                //console.log(commits_info);
                //console.log(PRs_info);
                var lines_of_code = 0;
                var PR_count = 0;
                var commits_count = 0;
                for (var q = 0; q < commits_info.length; q = q + 1) {
                    if (commits_info[q].author != null && commits_info[q].author.login == users_info[j].github_username) {
                        if(commits_info[q].commit.author.date >  curr_date.toISOString()) {
                            continue;
                        }
                        if(commits_info[q].commit.author.date <  since.toISOString()) {
                            break;
                        }
                        commits_count = commits_count + 1;
                        var commit = await github_api.getSingleCommit(org_info[i].org_name, repos_info[k].name, commits_info[q].sha, org_info[i].github_token);
                        //console.log(commit);
                        lines_of_code = lines_of_code + commit.stats.total;
                    }
                }
                for (var p = 0; p < PRs_info.length; p = p + 1) {
                    // TODO may arouse undefined PRs_info[p].user
                    if (PRs_info[p].user.login == users_info[j].github_username) {
                        PR_count = PR_count + 1;
                    }
                }
                var record = [org_info[i].org_id, users_info[j].user_id, repos_info[k].name, since, curr_date, commits_count, PR_count, lines_of_code];
                // console.log(record);
                await db.insertRecordIntoGithubStatistics(record);
            }
        }
    }
}

express.repoList = function (req, res, next) {
    return express.json(repos);
};

async function userInOrg(orgName, token) {
    // export data
    // save to db in mattermostController.js
    options = github_api.getDefaultOptions('/orgs/' + orgName + '/members', 'GET', token);
    return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body)
		{
			if( error )
			{
				console.log(error);
				reject(error);
				return; // Terminate execution.
			}
			resolve(body);
		});
	});
}

async function checkUserRole(org_name, username, token){
	let options = github_api.getDefaultOptions('/orgs/' + org_name + '/memberships/' + username, 'GET', token);
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body)
		{
			if( error )
			{
				console.log(error);
				reject(error);
				return; // Terminate execution.
			}
			//console.log(response.headers);
			resolve(body);
		});
	});
}

exports.fetchData = fetchData;
exports.userInOrg = userInOrg;
exports.checkUserRole = checkUserRole;
