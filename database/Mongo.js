var assert = require('assert');

var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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
        list.push({'url': 'http://localhost:3000/api/objects/' + result['_id']});
      });
      cb(null, list);
    }
  });
};

Mongo.getObjectWithUID = function(uid, cb){
  objects.find({'_id': new ObjectID(uid)}).next(function(err, result){
    if(err){
      cb({
        'verb': 'GET',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': err.message
      }, null);
    } else if(!result.hasOwnProperty('_id')){
      cb({
        'verb': 'GET',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': 'Could not find object with specified UID'
      }, null);
    } else {
      cb(null, result.renameProperty('_id', 'uid'));
    }
  });
};

Mongo.createObject = function(obj, cb){
  objects.insertOne(obj, function(err, r){
    if(err){
      cb({
          'verb': 'POST',
          'url': 'http://localhost:3000/api/objects',
          'message': err.message
      }, null);
    } else {
      cb(null, r.ops[0].renameProperty('_id', 'uid'));
    }
  });
};

Mongo.updateObject = function(uid, obj, cb){
  objects.replaceOne({'_id': new ObjectID(uid)}, obj, function(err, result){
    if(err){
      cb({
        'verb': 'PUT',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': err.message
      }, null);
    } else if(result.result.nModified != 1){
      cb({
        'verb': 'PUT',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': 'There is no object with the specified UID.'
      });
    } else {
      var newObj = result.ops[0];
      newObj.uid = uid;
      cb(null, newObj);
    }
  });
};

Mongo.deleteObject = function(uid, cb){
  objects.deleteOne({'_id': new ObjectID(uid)}, function(err, r){
    if(err){
      cb({
        'verb': 'DELETE',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': err.message
      });
    } else if(r.result.n == 0) {
      cb({
        'verb': 'DELETE',
        'url': 'http://localhost:3000/api/objects/' + uid,
        'message': 'There is no object with the specified UID to delete.'
      });
    } else {
      cb(null);
    }
  });
};

module.exports = Mongo;
