var assert = require('assert');

var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;

var objects;
MongoClient.connect('mongodb://localhost:27017/rest', function(err, db) {
  if(err) throw err;
  objects = db.collection('objects');
});

var Mongo = {};

Object.prototype.renameProperty = function (oldName, newName) {
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    return this;
};

Mongo.getAllObjectUIDs = function(cb){
  objects.find().toArray(function(err, results){
    if(err){
      cb({
        'verb': 'GET',
        'url': 'http://localhost:3000/api/objects/',
        'message': err.message
      }, null);
    } else {
      var list = [];
      results.forEach(function(result){
        list.push(result['_id']);
      });
      cb(null, list);
    }
  });
};

Mongo.getObjectWithUID = function(uid, cb){
  objects.find().limit(1).next(function(err, result){
    if(err){
      cb({
        'verb': 'GET',
        'url': 'http://localhost:3000/api/objects' + uid,
        'message': err.message
      }, null);
    } else {
      cb(null, result);
    }
  });
};

Mongo.createObject = function(obj, cb){
  objects.insertOne(obj, function(err, result){
    if(err){
      cb({
          'verb': 'POST',
          'url': 'http://localhost:3000/api/objects',
          'message': err.message
      }, null);
    } else {
      cb(null, result.ops[0].renameProperty('_id', 'uid'));
    }
  });
};

Mongo.updateObject = function(uid, obj, cb){
  objects.replaceOne({'_id': uid}, obj, function(err, result){
    if(err){
      cb({
        'verb': 'PUT',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': err.message
      }, null);
    } else {
      console.log(result.ops);
      cb(null, result.ops[0].renameProperty('_id', 'uid'));
    }
  });
};

Mongo.deleteObject = function(uid, cb){
  object.deleteOne({'_id': uid}, function(err){
    if(err){
      cb({
        'verb': 'DELETE',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': err.message
      });
    } else {
      cb(null);
    }
  });
};

module.exports = Mongo;
