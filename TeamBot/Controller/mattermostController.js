var request = require('request');

function newTeamBot() {
    // TODO call webhook
    // https://docs.mattermost.com/developer/integration-faq.html
    // get new team bot request
    // cal authenController.js
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