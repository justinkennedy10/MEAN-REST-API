var assert = require('assert');
var Mongo = require('./../database/Mongo');

var createdObject = {};

//Remove all documents from database.


describe('getAllObjectUIDs()', function() {
  it('Should return an empty Array when the database has no documents', function(done){
    Mongo.getAllObjectUIDs(function(err, arr){
      assert.equal(arr instanceof Array, true);
      assert.equal(0, arr.length);
      done();
    });
  });
});

describe('createObject()', function(){
  it('Should create 2 new objects with unique UIDs', function(done){
    Mongo.createObject({'key': 'value'}, function(err, newObj){
      createdObject = newObj;
      Mongo.createObject({'key2': 'value2'}, function(err, newerObj){
        assert.equal(newObj['key'], 'value');
        assert.equal(newerObj['key2'], 'value');
        assert.equal(newObj.hasOwnProperty('uid'), true);
        assert.equal(newerObj.hasOwnProperty('uid'), true);
        assert.notEqual(newObj['uid'], newerObj['uid']);
        done();
      });
    });
  });
});

describe('getAllObjectUIDs()', function(){
  it('Should return an Array containing one element that is a url', function(done){
    Mongo.getAllObjectUIDs(function(err, arr){
      assert.equal(arr instanceof Array, true);
      assert.equal(2, arr.length);
      done();
    });
  });
});

describe('getObjectWithUID()', function(){
  it('Should return the correct object', function(done){
    Mongo.getObjectwithUID(createdObject['uid'], function(err, obj){
      assert.equal(obj instanceof Object, true);
      assert.equal(obj.uid, createdObject.uid);
      assert.equal(obj['key'], createdObject['key']);
      done();
    });
  });
});

describe('updateObject()', function(){
  it('Should return an updated version of the object', function(done){
    Mongo.updateObject(createdObject['uid'], {'key3': 'value3'}, function(err, obj){
      assert.equal(obj instanceof Object, true);
      assert.equal(obj['key3'], 'value3');
      assert.equal(obj['uid'], createdObject['uid']);
      done();
    });
  });
});

describe('deleteObject()', function(){
  it('Should delete the object', function(done){
    Mongo.deleteObject(createdObject['uid'], function(err){
      Mongo.getAllObjectUIDs(function(err, arr){
        assert.equal(arr instanceof Array, true);
        assert.equal(arr.length, 1);
        done();
      });
    });
  });
});
