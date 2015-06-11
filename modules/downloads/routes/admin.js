/**
 * @file admin.js
 * Downloadsspace Downloads Admin Routes
 * @desc Downloads admin routes
 */

var rek = require('rekuire'),
    m_settings = rek('modules/downloads/settings');

var routes = {};


/**
 * @desc  Parent admin Downloads route
 * @return object - Downloads admin parent page render
 */
routes['/' + m_settings.route_prefix + '/admin/parent'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'admin/parent');
    }
};


module.exports = routes;

