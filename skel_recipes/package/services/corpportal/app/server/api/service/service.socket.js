/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var service = require('./service.model');

exports.register = function(socket) {
  service.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

}
