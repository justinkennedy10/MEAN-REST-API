var winston = require('winston');
var express = require('express');

var router = express.Router();

router.use(express.static('views'));

module.exports = router;
