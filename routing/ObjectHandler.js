var winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var Mongo = require('./../database/Mongo');

var router = express.Router();

//Choose database using config.json
var database;
fs.readFile('/../config.json', 'utf8', function (err, data) {
  if (err) throw err;
  var db = JSON.parse(data);
  if(db.databse = 'MongoDB'){
    databse = Mongo;
  } else throw new Error('Specify a proper database');
});

//Middleware
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Handle Requests
router.get('/', function(req, res){
  database.getAllObjectUIDs(function(list){
    res.json(list);
  });
});

router.get('/:uid', function(req, res){
  database.getObjectWithUID(req.params.uid, function(obj){
    res.json(obj);
  });
});

router.post('/', function(req, res){
  database.createObject(req.body, function(obj){
    res.json(obj);
  });
});

router.put('/:uid', function(req, res){
  database.updateObject(req.params.uid, req.body, function(obj){
    res.json(obj);
  });
});

router.delete('/:uid', function(req, res){
  database.deleteObject(req.params.uid, function(){
    res.send('');
  })
});

//Errors

module.exports = router
