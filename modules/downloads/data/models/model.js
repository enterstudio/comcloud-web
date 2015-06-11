
/**
 * @file Downloads.js
 * Downloadsspace Downloads model
 * @desc MongoDB Downloads object model
 */


var mongoose = require('mongoose'),
    rek = require('rekuire'),
    moduleSchema = rek('modules/downloads/data/schemas/schema'),
    schema = mongoose.model('Downloads', moduleSchema);

module.exports = schema;
