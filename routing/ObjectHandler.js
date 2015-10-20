var winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var Mongo = require('./../database/Mongo');

var router = express.Router();

//Choose database using config.json
var database = {};
if(JSON.parse(fs.readFileSync('config.json', 'utf8'))['database'] == "MongoDB"){
  database = Mongo;
} else throw new Error('Please specify a proper database in config.json');

//Middleware
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Handle Requests
router.get('/:uid', function(req, res){
  database.getObjectWithUID(req.params.uid, function(err, obj){
    res.json(err || obj);
  });
});

router.get('/', function(req, res){
  database.getAllObjectUIDs(function(err, list){
    res.json(err || list);
  });
});

router.post('/', function(req, res){
  database.createObject(req.body, function(err, obj){
    res.json(err || obj);
  });
});

router.put('/:uid', function(req, res){
  database.updateObject(req.params.uid, req.body, function(err, obj){
    if(err){
      res.json(err);
    } else {
      res.json(obj);
    }
  });
});

router.delete('/:uid', function(req, res){
  database.deleteObject(req.params.uid, function(err){
    res.json(err || {});
  })
});

//Errors

module.exports = router
