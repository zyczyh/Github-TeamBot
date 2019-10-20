var express = require('express');
var db = require('../db');
var dbController = require('./databaseController');

app.get('/user-report/:id/', function(req, res) {
    var id = req.params.id;
});