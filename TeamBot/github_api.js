var request = require('request');
var config = require('./config.json');

var urlRoot = config.github_url_root;

function getDefaultOptions(endpoint, method, token)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "TeamBot-Server",
			"content-type": "application/json",
			"Authorization": `token ${token}`
		},
	};
	return options;
}

async function getReposInOrg(org_name, token)
{
    let options = getDefaultOptions("/orgs/"+org_name+"/repos", "GET", token);

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
			resolve(JSON.parse(body));
		});
	});
}

async function getCommits(org_name, repo, user_name, since, token)
{
    let options = getDefaultOptions("/repos/"+org_name+"/"+repo+"/commits", "GET", token);
    options.json =
    {
        "author": user_name,
        "since": since
    };
    
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

async function getPRs(org_name, repo, token)
{
    let options = getDefaultOptions("/repos/"+org_name+"/"+repo+"/pulls", "GET", token);
    options.json = 
    {
        "state": "closed",
        "base": "master"
    };
    
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

async function getSingleCommit(org_name, repo, ref, token)
{
    let options = getDefaultOptions("/repos/"+org_name+"/"+repo+"/commits/"+ref, "GET", token);

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
			resolve(JSON.parse(body));
		});
	});
}

/*
(async () => {
    var date = new Date("2019-10-28");
    var x = await getReposInOrg("csc510-fall2019", "2162eb2daeb479931cc7dea401c36e901ccad9d8");
    //console.log(x); 
    //x = await getCommits("csc510-fall2019", "CSC510-19", "hwu23", date, "2162eb2daeb479931cc7dea401c36e901ccad9d8");
    //console.log(x);
    x = await getPRs("csc510-fall2019", "CSC510-19", "2162eb2daeb479931cc7dea401c36e901ccad9d8");
    console.log(x);
    //x = await getSingleCommit("csc510-fall2019","CSC510-19","fc05ba47a57a44a441790aaa030d0d35c88ecc8e","2162eb2daeb479931cc7dea401c36e901ccad9d8");
    //console.log(x);
})()
*/
module.exports.getReposInOrg = getReposInOrg;
module.exports.getCommits = getCommits;
module.exports.getSingleCommit = getSingleCommit;
module.exports.getPRs = getPRs;
module.exports.getDefaultOptions = getDefaultOptions;
