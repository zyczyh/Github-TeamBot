var express = require('express');
var request = require('request');

function newTeamBot() {
    // TODO call webhook
    // https://docs.mattermost.com/developer/integration-faq.html
    // get new team bot request
    // cal authenController.js
}

function sendReport() {
    // TODO call webhook

    // get report from reportController -- mock

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

    var data = {"channel": user, "text": "Here is your weekly report, check it out <" + link + ">"};

    new Promise(function (resolve, reject) {
        var requestSendLink = request(options, function (error, res, body) {
            resolve(res.statusCode);
        });
        requestSendLink.write(JSON.stringify(data));
        requestSendLink.end();
    });
}

function getDefaultOptions(incomingHookLink, method) {
    var options = {
        url: incomingHookLink,
        method: method,
    };
    return options;
}

exports.postReports = postReports;