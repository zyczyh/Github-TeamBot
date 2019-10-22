var express = require('express');
// var request = require('request');
/*

 */
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

function postReports(hostURL, data) {
    var options = {
        url: hostURL,
        method: "POST"
    };
    console.log('laskdhf');
    new Promise(function (resolve, reject) {
        var requestSendLink = request(options, function (error, res, body) {
            resolve(res.statusCode);
        });
        requestSendLink.write(JSON.stringify(data));
        requestSendLink.end();
    });
}



exports.postReports = postReports;