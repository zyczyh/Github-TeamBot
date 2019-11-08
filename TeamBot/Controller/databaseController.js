var mysql = require('mysql');
var config = require('../config');

/*
var connection = mysql.createConnection({
    host     : config.DB.host,
    user     : config.DB.user,
    password : config.DB.password,
    database : config.DB.database,
    port     : config.DB.port
});
*/

function test() {
    connection.connect();

    connection.query('SHOW TABLES;', function (err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: \n', rows)
    });

    connection.end();
}

//test();
function createConnection()
{
    return mysql.createConnection({
        host     : config.DB.host,
        user     : config.DB.user,
        password : config.DB.password,
        database : config.DB.database,
        port     : config.DB.port
    });
}

async function getOrgInfoFromDb() 
{
    var connection = createConnection();
    return new Promise(function(resolve, reject)
    {
        connection.query('SELECT * FROM Organization', function(err, result, fields) 
        {
            //connection.end();
            if (err) 
            {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function getUserInfoByOrgFromDb(org_id)
{
    var connection = createConnection();
    var query = 'SELECT user_id, github_username FROM Users WHERE org_id = ?';
    return new Promise(function(resolve, reject)
    {
        connection.query(query, [org_id], function(err, result, fields) 
        {
            //connection.end();
            if (err) 
            {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function insertRecordIntoGithubStatistics(record)
{
    var connection = createConnection();
    var query = 'INSERT INTO GithubStatistics (org_id, user_id, repo_name, date_since, since_until, commits_number, pullrequest_number, codelines_change) VALUES (?,?,?,?,?,?,?,?)';
    return new Promise(function(resolve, reject)
    {
        connection.query(query, record, function(err, result, fields) 
        {
            //connection.end();
            if (err) 
            {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
} 

async function insertRecordIntoUsers(record)
{
    var connection = createConnection();
    var query = 'INSERT INTO Users (org_id, mattermost_username, github_username, user_role) VALUES (?,?,?,?)';
    return new Promise(function(resolve, reject)
    {
        connection.query(query, record, function(err, result, fields) 
        {
            //connection.end();
            if (err) 
            {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
} 

async function insertRecordIntoOrganization(record)
{
    var connection = createConnection();
    var query = 'INSERT INTO Organization (org_name, github_token) VALUES (?,?)';
    return new Promise(function(resolve, reject)
    {
        connection.query(query, record, function(err, result, fields) 
        {
            if (err) 
            {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
} 


/*
(async () => {
    //var x = await getOrgInfoFromDb(); 
    //console.log(x);
    var curr_date = new Date(Date.now());
    var record = [1,1,"test",curr_date,curr_date,4,2,50];
    var x = await insertRecordIntoGithubStatistics(record);
    console.log(x);
    //connection.end();
})()
*/
module.exports.getOrgInfoFromDb = getOrgInfoFromDb;
module.exports.getUserInfoByOrgFromDb = getUserInfoByOrgFromDb;
module.exports.insertRecordIntoGithubStatistics = insertRecordIntoGithubStatistics;
module.exports.insertRecordIntoUsers = insertRecordIntoUsers;
module.exports.insertRecordIntoOrganization = insertRecordIntoOrganization;