/**
 * @file admin.js
 * Comcloudspace Comcloud Admin Routes
 * @desc Comcloud admin routes
 */

var rek = require('rekuire'),
    m_settings = rek('modules/comcloud/settings');

var routes = {};


/**
 * @desc  Parent admin Comcloud route
 * @return object - Comcloud admin parent page render
 */
routes['/' + m_settings.route_prefix + '/admin/parent'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'admin/parent');
    }
};


module.exports = routes;

