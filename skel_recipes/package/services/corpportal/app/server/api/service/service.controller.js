/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /service              ->  index
 * POST    /service              ->  create
 * GET     /service/:id          ->  show
 * PUT     /service/:id          ->  update
 * DELETE  /service/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Service = require('./service.model');

// Get list of services
exports.index = function(req, res) {
  Service.find(function (err, services) {
    if(err) { return handleError(res, err); }
    for (var x in services){
      if (services[x].codename == "zimbra") {
        var crypto = require('crypto');
        var timestamp = Date.now();
        var text = "casuser|name|0|" + timestamp;
        var hash = crypto.createHmac('sha1', '2cb0cc438b7471c428af3e23c5ee3835c72566f68af872c0b0e63a90003759a7').update(text).digest('hex');
        services[x].link = services[x].link + '/service/preauth?account=casuser&by=name&timestamp=' + timestamp + '&expires=0&preauth=' + hash;
      }
    }
    return res.status(200).json(services);
  });
};

// Get a single service
exports.show = function(req, res) {
  Service.findById(req.params.id, function (err, service) {
    if(err) { return handleError(res, err); }
    if(!service) { return res.status(404).send('Not Found'); }
    return res.json(service);
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}
