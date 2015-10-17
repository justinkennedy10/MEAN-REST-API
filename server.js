var winston = require('winston');
var express = require('express');

var ObjectHandler = require('./routing/ObjectHandler');
var WebHandler = require('./routing/WebHandler');

var app = express();

//Middleware

//Route Requests
app.use('/api/objects/', ObjectHandler);
app.use('/', WebHandler);

//Errors
app.use(function(err, req, res, next){
  err = err || new Error('Not Found');
  res.status(500);
  res.render('error', err);
});
