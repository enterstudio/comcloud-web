'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://db/corpportal-dev'
  },

  casserver: {
    host: 'casserver'
  },

  seedDB: true
};
