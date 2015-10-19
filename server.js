/*
TODO
make rest calls return right thing
change ip in error messages
angular web app
*/

var winston = require('winston');
var express = require('express');

var ObjectHandler = require('./routing/ObjectHandler');
var WebHandler = require('./routing/WebHandler');

var app = express();

//Route REST Calls and Home Page Requests
app.use('/api/objects/', ObjectHandler);
app.use('/', WebHandler);

//Errors
app.use(function(err, req, res, next){
  err = err || new Error('Not Found');
  res.json(err);
});

//Create Server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});
