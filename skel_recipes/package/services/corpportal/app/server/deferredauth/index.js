'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');

var router = express.Router();

router.use('/', require('../auth/cas'));


module.exports = router;
