
/**
 * @file Comcloud.js
 * Comcloudspace Comcloud schema
 * @desc MongoDB Comcloud object schema
 */

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    _ = require('underscore');


var moduleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    name: String,
    type: String,
    employees : String,
    tech: String,
    communication: String,
    info: String,
    domain: String,
    logo: String
});

module.exports = moduleSchema;
