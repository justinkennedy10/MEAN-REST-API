var winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');

var Mongo = require('./../database/Mongo');

var router = express.Router();

//Middleware
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Handle Requests
router.get('/', function(req, res){

});

router.get('/:uid', function(req, res){

});

router.post('/', function(req, res){

});

router.put('/:uid', function(req, res){

});

router.delete('/:uid', function(req, res){

});

//Errors

module.exports = router
