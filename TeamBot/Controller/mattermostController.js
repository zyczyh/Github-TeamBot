var express = require('express');

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
    request.post(hostURL, JSON.stringify(data), function (error, res, body) {
            if (!error && res.statusCode == 200) {
                console.log(body);
            }
        }
    );
}

exports.postReports = postReports;