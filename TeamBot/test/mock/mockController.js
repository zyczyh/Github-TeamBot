var express = require('express');
var db = require('./mock');

exports.getAllCommits = function (repoName) {
    return db.getAllCommits;
};

exports.getAllUsers = function () {
    return db.getAllUsers;
};

exports.getAllMngrs = function () {
    return db.getAllMngrs;
};



