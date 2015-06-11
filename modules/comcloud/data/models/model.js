
/**
 * @file Comcloud.js
 * Comcloudspace Comcloud model
 * @desc MongoDB Comcloud object model
 */


var mongoose = require('mongoose'),
    rek = require('rekuire'),
    moduleSchema = rek('modules/comcloud/data/schemas/schema'),
    schema = mongoose.model('Comcloud', moduleSchema);

module.exports = schema;
