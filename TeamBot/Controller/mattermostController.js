var express = require('express');
var request = require('request');
var mattermost_api = require('../mattermost_api');

/*

 */
function sendTextToUser(text, username, iurl) {
    var options = {
        url: iurl,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: {
            'text': text
        }
    };
    if (username != '') {
        options.json.channel = '@' + username;
    } 
    //console.log(options);
    return new Promise(function(resolve, reject)
    {
        request(options, function (error, response, body)
        {
            if(error)
            {
                console.log(error);
                reject(error);
                return;
            }
            //console.log(body);
            //resolve( JSON.parse(body));
        });
    });            
}

async function sendToAllTeamMembers(team_id, iurl) {
    var all_members = await mattermost_api.getAllTeamMembers(team_id);
    var len = all_members.length;
    for (var i = 0; i < len; i = i + 1) {
        var text = '@' + all_members[i].username + ' Hello, I\'m Tim(the TeamBot), your team is going to have a Github Monitor soon, so could you please input your Github username in Town Square for me? (You should add \'@\' before your username)';
        sendTextToUser(text, all_members[i].username, iurl);
    }
}

function respondToUser(post, username) {
    // TODO call webhook
    // https://docs.mattermost.com/developer/integration-faq.html
    // deal with user posts from outgoing webhook
    // cal authenController.js
    var iurl = 'http://localhost:8065/hooks/jrmosxrretg43ki5et4sqsdgqa';
    var authen_link = 'http://192.168.163.177:3000/authen';
    var text = '';
    var org = ['sam', 'yanchen'];
    var team_id = 'dtziu37n17dmpr59unppw4fmry';
    post = post.toLowerCase().replace('@teambot', '').trim();
    // if user post contains 'create' or 'set up' and 'Monitor'
    if (((post.includes('create') || post.includes('set up')) && post.includes('monitor') && post.includes('github')) || post == 'yes') {
        text = '@' + username + ' How are you! I\'m the TeamBot, you can also call me Tim (-: Please use this link to set up the monitor, thank you! ' + authen_link;
    }
    else if (post == 'no') {
        text = '@' + username + ' Sorry, I can\'t help you, my job is only to create Monitor Q_Q';
        username = '';
    }
    else if (post[0] == '@') {
        // check if username is in github organization
        if (org.includes(post.substring(1))) {
            text = '@' + username + ' Thank you for your response, we have received and verified your info, thanks!';
        }
        else {
            text = '@' + username + ' Sorry, your username is not in your team\'s Github Org, you can input again if you want.';
        }
    }
    else {
        text = '@' + username + ' Do you want to create a Github Monitor for your team? (Please input Yes or No)';
        username = '';
    } 
    sendTextToUser(text, username, iurl);
}

function postReports(incomingHookLink, user, link) {
    /**
     * send weekly report link to particular user
     * @param incomingHookLink
     * @param user: user name, eg: @testuser
     * @param link: weekly report link(api call)
     * @type {{method: *, url: *}}
     */

    var options = getDefaultOptions(incomingHookLink, 'POST');

    var data = {"channel": user, "text": "Your weekly report is ready, check it out <" + link + "|here>"};
    console.log(data);

    new Promise(function (resolve, reject) {
        var requestSendLink = request(options, function (error, res, body) {
            resolve(res.statusCode);
        });
        requestSendLink.write(JSON.stringify(data));
        requestSendLink.end();
    });
}

function getDefaultOptions(incomingHookLink, method) {
    return {
        url: incomingHookLink,
        method: method,
    };
}

exports.postReports = postReports;
module.exports.respondToUser = respondToUser;
module.exports.sendToAllTeamMembers = sendToAllTeamMembers;
