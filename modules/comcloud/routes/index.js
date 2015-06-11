/**
 * @file index.js
 * Comcloudspace Comcloud Routes
 * @desc Comcloud routes
 */

var _ = require('underscore'),
    rek = require('rekuire'),
    m_settings = rek('modules/comcloud/settings'),
    wizardMiddleware = rek('modules/comcloud/middlewares/wizard');


var routes = {};


/**
 * @desc  Main Comcloud route
 * @return object - Comcloud main page render
 */
routes['/' + m_settings.route_prefix] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'index');
    }
};

/**
 * @desc  Comcloud partial route
 * @return object - Comcloud partial render
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
 * @desc  Comcloud wizard route
 * @return object - Comcloud wizard render
 */
routes['/' + m_settings.route_prefix + '/wizard/step/:step'] =  {
    methods: ['get'],
    middleware: [wizardMiddleware(m_settings.route_prefix)],
    fn: function(req, res, next) {
        var step = req.params.step;
        var lastItem = _.last(m_settings.steps);

        if (parseInt(step) > lastItem.step || parseInt(step) < 1) {
            step = 1;
        }

        res.render(m_settings.viewsPath + 'wizard/' + step,
            {
                data: {
                    current_step: step,
                    total: m_settings.steps
                }
            }
        );
    }
};

module.exports = routes;
