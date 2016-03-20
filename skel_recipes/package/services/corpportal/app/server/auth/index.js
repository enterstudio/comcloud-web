'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');

var router = express.Router();

router.use('/cas', require('./cas'));


module.exports = router;
