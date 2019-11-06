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
    var connection = createConnection();

    var query = 'select * from GithubStatistics';

    connection.query(query, ['zyc'], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    connection.end();
}

test();
async function f() {
    var a = await countOrgUserNum(0);
    console.log(a);
}

// f();

function createConnection() {
    return mysql.createConnection({
        host: config.DB.host,
        user: config.DB.user,
        password: config.DB.password,
        database: config.DB.database,
        port: config.DB.port
    });
}

async function getOrgInfoFromDb() {
    var connection = createConnection();
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM Organization', function (err, result, fields) {
            //connection.end();
            if (err) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function getUserInfoByOrgFromDb(org_id) {
    var connection = createConnection();
    var query = '?SELECT user_id, github_username FROM Users WHERE org_id = ?';
    return new Promise(function (resolve, reject) {
        connection.query(query, [org_id], function (err, result, fields) {
            //connection.end();
            if (err) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function insertRecordIntoGithubStatistics(record) {
    var connection = createConnection();
    var query = 'INSERT INTO GithubStatistics (org_id, user_id, repo_name, date_since, since_until, commits_number, pullrequest_number, codelines_change) VALUES (?,?,?,?,?,?,?,?)';
    return new Promise(function (resolve, reject) {
        connection.query(query, record, function (err, result, fields) {
            //connection.end();
            if (err) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function getOrgIdByMName(userName) {
    var connection = createConnection();

    var query = 'select * from Organization where org_id=(select org_id from Users where mattermost_username=?)';

    return new Promise(function (res, rej) {
        connection.query(query, [userName], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                res(result[0].org_id);
            } else {
                res(null)
            }
        });
        connection.end();
    });
}

async function countOrgUserNum(orgId) {
    var connection = createConnection();

    var query = 'select count(*) from Users where org_id=?';

    return new Promise(function (res, rej) {
        connection.query(query, [orgId], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                res(result[0]['count(*)']);
            } else {
                res(null)
            }
        });
        connection.end();
    });
}

async function countLessCommitUser(userName, orgId, since) {
    var connection = createConnection();

    var query = 'select count(*) from GithubStatistics '
        + 'where org_id=? '
        + 'and date_since>=?'
        + 'and commits_number > (select commits_number from GithubStatistics where user_id='
        + '(select user_id from Users where mattermost_username=?))';

    return new Promise(function (res, rej) {
        connection.query(query, [orgId, since, userName], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                res(result[0]['count(*)']);
            } else {
                res(null)
            }
        });
        connection.end();
    });
}

module.exports.getOrgInfoFromDb = getOrgInfoFromDb;
module.exports.getUserInfoByOrgFromDb = getUserInfoByOrgFromDb;
module.exports.insertRecordIntoGithubStatistics = insertRecordIntoGithubStatistics;
module.exports.getOrgIdByMName = getOrgIdByMName;
module.exports.countOrgUserNum = countOrgUserNum;
module.exports.countLessCommitUser = countLessCommitUser;