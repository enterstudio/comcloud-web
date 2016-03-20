/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Service = require('../api/service/service.model');

// TODO 
// create preauth url hash for Zimbra link


var owncloudAvailable = (process.env.APP_OWNCLOUD === 'true');
var zimbraAvailable   = (process.env.APP_ZIMBRA   === 'true');
var redmineAvailable  = (process.env.APP_REDMINE  === 'true');
var jabberAvailable   = (process.env.APP_OPENFIRE === 'true');

Service.find({}).remove(function() {
  Service.create({
    name : 'OwnCloud',
    codename: 'owncloud',
    info : 'File storage.',
    active: owncloudAvailable,
    link : 'http://'+process.env.MASTER_FQDN+':8081/owncloud'
  }, {
    name : 'Zimbra',
    codename: 'zimbra',
    info : 'Calendar and mail.',
    active: zimbraAvailable,
    link : 'https://'+process.env.MASTER_FQDN+':8082'
  }, {
    name : 'Redmine',
    codename: 'redmine',
    info : 'Project management, task assignement and time tracking.',
    active: redmineAvailable,
    link : 'http://'+process.env.MASTER_FQDN+':8083'
  },  {
    name : 'Jabber',
    codename: 'openfire',
    info : 'Instant messaging.',
    active: jabberAvailable,
    link : 'http://'+process.env.MASTER_FQDN+':8084'
  });
});