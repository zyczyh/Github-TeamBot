var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
    host     : config.DB.host,
    user     : config.DB.user,
    password : config.DB.password,
    database : config.DB.database,
    port     : config.DB.port
});

function test() {
    connection.connect();

    connection.query('SHOW TABLES;', function (err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: \n', rows)
    });

    connection.end();
}
