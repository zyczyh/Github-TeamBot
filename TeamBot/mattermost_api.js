var request = require('request');

var urlRoot = "http://localhost:8065/api/v4";
var token = "9dyd5pj61jg8tbj36c4jfezduh";

function getDefaultOptions(endpoint, method)
{
    var options = {
        url: urlRoot + endpoint,
        method: method,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    return options;
}

async function getAllTeamMembers(team_id)
{
    let options = getDefaultOptions("/users", "GET");
    options.json = {
        "in_team": team_id
    };
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
            resolve(body);
        });
    });
}
module.exports.getAllTeamMembers = getAllTeamMembers;
