var mysql = require('mysql');
var config = require('../config');

function test() {
    var connection = createConnection();

    // var query = 'insert into Users values (1, 1, \'employee1\', \'zhu6\', \'member\')';
    var query = 'select * from GithubStatistics';
    // var query = 'select * from GithubStatistics';

    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    connection.end();
}
// test();

async function f() {
    var a = await listAllOrgId();
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

async function getUserInfoByOrgFromDb(org_id) {
    var connection = createConnection();
    var query = 'SELECT user_id, github_username FROM Users WHERE org_id = ?';
    return new Promise(function (resolve, reject) {
        connection.query(query, [org_id], function (err, result, fields) {
            //connection.end();
            if (err) {
                console.log(err);
                reject(err);
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
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
        connection.end();
    });
}

async function getOrgIdByMName(userName) {
    var connection = createConnection();

    var query = 'select * from Organization where org_id=(select org_id from Users where github_username=?)';

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

    // TODO data_since and since_until meaning and edge case
    var query = 'select count(*) from GithubStatistics '
        + 'where org_id=? '
        + 'and date_since<=? '
        + 'and since_until>=? '
        + 'and commits_number > (select commits_number from GithubStatistics where user_id='
        + '(select user_id from Users where github_username=?))';

    return new Promise(function (res, rej) {
        connection.query(query, [orgId, since, since, userName], function (err, result, fields) {
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

async function getStatisticsByUserAndDate(userName, date) {
    var connection = createConnection();

    var query = 'select * from GithubStatistics '
        + 'where user_id=(select user_id from Users where github_username=?) and '
        + 'date_since<=? and '
        + 'since_until>=?';

    return new Promise(function (res, rej) {
        connection.query(query, [userName, date, date], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                res(result);
            } else {
                res(null)
            }
        });
        connection.end();
    });

}

async function listGithubNameInSameOrg(userName) {
    var connection = createConnection();

    var query = 'select github_username from Users '
        + 'where org_id=(select org_id from Users where github_username=?)';

    return new Promise(function (res, rej) {
        connection.query(query, [userName], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                var list = [];
                for (var line of result) {
                    list.push(line['github_username'])
                }
                res(list);
            } else {
                res([]);
            }
        });
        connection.end();
    });
}

async function listMngrGithubNameByOrgId(orgId) {
    var connection = createConnection();

    var query = 'select github_username from Users where org_id=? and user_role=\'admin\'';

    return new Promise(function (res, rej) {
        connection.query(query, [orgId], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                var list = [];
                for (var line of result) {
                    list.push(line['github_username'])
                }
                res(list);
            } else {
                res([])
            }
        });
        connection.end();
    });
}

async function listUserGithubNameByOrgId(orgId) {
    var connection = createConnection();

    var query = 'select github_username from Users where org_id=? and user_role=\'member\'';

    return new Promise(function (res, rej) {
        connection.query(query, [orgId], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                var list = [];
                for (var line of result) {
                    list.push(line['github_username'])
                }
                res(list);
            } else {
                res([])
            }
        });
        connection.end();
    });
}

async function getMattermostNameByGithubName(gName) {
    // TODO test
    var connection = createConnection();

    var query = 'select mattermsot_username from Users where github_username=?';

    return new Promise(function (res, rej) {
        connection.query(query, [gName], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                res(result[0]['mattermost_username']);
            } else {
                res(null)
            }
        });
        connection.end();
    });
}

async function listAllOrgId() {
    var connection = createConnection();

    var query = 'select org_id from Organization';

    return new Promise(function (res, rej) {
        connection.query(query,  function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0) {
                var list = [];
                for (var line of result) {
                    list.push(line['org_id'])
                }
                res(list);
            } else {
                res([])
            }
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

module.exports.getOrgInfoFromDb = getOrgInfoFromDb;
module.exports.getUserInfoByOrgFromDb = getUserInfoByOrgFromDb;
module.exports.insertRecordIntoGithubStatistics = insertRecordIntoGithubStatistics;
module.exports.getOrgIdByMName = getOrgIdByMName;
module.exports.countOrgUserNum = countOrgUserNum;
module.exports.countLessCommitUser = countLessCommitUser;
module.exports.getStatisticsByUserAndDate = getStatisticsByUserAndDate;
module.exports.listGithubNameInSameOrg = listGithubNameInSameOrg;
module.exports.listMngrGithubNameByOrgId = listMngrGithubNameByOrgId;
module.exports.listUserGithubNameByOrgId = listUserGithubNameByOrgId;
module.exports.getMattermostNameByGithubName = getMattermostNameByGithubName;
module.exports.listAllOrgId = listAllOrgId;
module.exports.insertRecordIntoUsers = insertRecordIntoUsers;
module.exports.insertRecordIntoOrganization = insertRecordIntoOrganization;
