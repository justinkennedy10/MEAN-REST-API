//Import Modules
var winston = require('winston');
var express = require('express');

var ObjectHandler = require('./routing/ObjectHandler');
var WebHandler = require('./routing/WebHandler');

//Set up Express
var app = express();

//Route REST Calls and Webpage Requests
app.use('/api/objects/', ObjectHandler);
app.use('/', WebHandler);
