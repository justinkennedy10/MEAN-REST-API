var winston = require('winston');
var express = require('express');

var router = express.Router();

//Serve Web Page
router.use(express.static('/../views'));

//Errors

module.exports = router;
