var express = require('express');
var request = require('request');

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
    console.log(options);
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
            console.log(body);
            //resolve( JSON.parse(body));
        });
    });            
}
function respondToUser(post, username) {
    // TODO call webhook
    // https://docs.mattermost.com/developer/integration-faq.html
    // deal with user posts from outgoing webhook
    // cal authenController.js
    var iurl = 'http://localhost:8065/hooks/jrmosxrretg43ki5et4sqsdgqa';
    var authen_link = '';
    var text = '';
    post = post.toLowerCase().replace('@teambot', '').trim();
    // if user post contains 'create' or 'set up' and 'Monitor'
    if (((post.includes('create') || post.includes('set up')) && post.includes('monitor') && post.includes('github')) || post == 'yes') {
        text = '@' + username + ' How are you! I\'m the TeamBot, you can also call me Tim (-: Please use this link to set up the monitor, thank you!' + authen_link;
    }
    else if (post == 'no') {
        text = '@' + username + ' Sorry, I can\'t help you, my job is only to create Monitor Q_Q';
        username = '';
    }
    else {
        text = '@' + username + ' Do you want to create a Github Monitor for your team?(Please input Yes or No)';
        username = '';
    } 
    sendTextToUser(text, username, iurl);
}


function sendReport() {
    // TODO call webhook

    // get report from reportController -- mock

}

module.exports.respondToUser = respondToUser;
