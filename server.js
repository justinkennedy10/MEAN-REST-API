var winston = require('winston');
var express = require('express');

var ObjectHandler = require('./routing/ObjectHandler');

var app = express();

//Middleware

//Route Requests and Serve Static Content
app.use('/api/objects/', ObjectHandler);
app.use('/', express.static('views'));

//Errors
app.use(function(err, req, res, next){
  err = err || new Error('Not Found');
  res.status(404);
  res.render('error', err);
});

//Create Server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});
