/**
 * @file index.js
 * Downloadsspace Downloads Routes
 * @desc Downloads routes
 */

var _ = require('underscore'),
    rek = require('rekuire'),
    m_settings = rek('modules/downloads/settings'),
    recipeMiddleware = rek('modules/downloads/middlewares/recipe');


var routes = {};


/**
 * @desc  Main Downloads route
 * @return object - Downloads main page render
 */
routes['/' + m_settings.route_prefix] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'index');
    }
};

/**
 * @desc  Downloads partial route
 * @return object - Downloads partial render
 */
routes['/' + m_settings.route_prefix + '/partials/:name'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        var name = req.params.name;
        res.render(m_settings.viewsPath + '/partials/' + name);
    }
};

/**
 * @desc  Generate recipe
 * @return object -
 */
routes['/' + m_settings.route_prefix + '/recipe'] =  {
    methods: ['post'],
    middleware: [recipeMiddleware()],
    fn: function(req, res) {
        res.json(
            {
                'response': req.response,
                'data': req.object
            }
        );
    }
};

module.exports = routes;
