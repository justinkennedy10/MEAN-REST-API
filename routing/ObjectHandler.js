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
router.use(bodyParser.json());
router.use(function(err, req, res, next){
  if(err instanceof SyntaxError){
    res.json({
      'verb': req.method.toUpperCase(),
      'url': req.originalURL,
      'message': 'Not a JSON Object'
    });
    winston.log('error', 'Got request that was not JSON');
  } else {
    next(err);
  }
})
router.use(bodyParser.urlencoded({extended: false}));

//Handle Requests
router.get('/:uid', function(req, res){
  winston.log('info', 'GET request made to ' + req.originalURL);
  database.getObjectWithUID(req.params.uid, function(err, obj){
    res.json(err || obj);
  });
});

router.get('/', function(req, res){
  winston.log('info', 'GET request made to ' + req.originalURL);
  database.getAllObjectUIDs(function(err, list){
    res.json(err || list);
  });
});

router.post('/', function(req, res){
  winston.log('info', 'POST request made to ' + req.originalURL);
  database.createObject(req.body, function(err, obj){
    res.json(err || obj);
  });
});

router.put('/:uid', function(req, res){
  winston.log('info', 'PUT request made to ' + req.originalURL);
  database.updateObject(req.params.uid, req.body, function(err, obj){
    res.json(err || obj);
  });
});

router.delete('/:uid', function(req, res){
  winston.log('info', 'DELETE request made to ' + req.originalURL);
  database.deleteObject(req.params.uid, function(err){
    res.json(err || '');
  })
});

//Errors

module.exports = router
