/*
TODO
fix mongo error handling and stuff
angular web app
log support
tests
*/

var winston = require('winston');
var express = require('express');

var ObjectHandler = require('./routing/ObjectHandler');
var WebHandler = require('./routing/WebHandler');

var app = express();

winston.add(winston.transports.File, { filename: 'logs/info.log' });
winston.remove(winston.transports.Console);

//Route REST Calls and Home Page Requests
app.use('/api/objects/', ObjectHandler);
app.use('/', WebHandler);

//Errors
app.use(function(err, req, res, next){
  err = err || new Error('Not Found');
  winston.log('error', err.message);
  res.json({
    'error': err.message
  });
});

//Create Server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});
winston.log('info', 'Server Running');
