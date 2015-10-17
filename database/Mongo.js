var assert = require('assert');

var winston = require('winston');
var MongoClient = require('mongodb').MongoClient;

var Mongo = function(){}

Mongo.prototype.getAllObjectUIDs = function(cb){

};

Mongo.prototype.getObjectWithUID = function(uid, cb){

};

Mongo.prototype.createObject = function(obj, cb){

};

Mongo.prototype.updateObject = function(uid, obj, cb){

};

Mongo.prototype.deleteObject = function(uid, cb){

};

module.exports = Mongo;
