
/**
 * @file settings.js
 * Comcloudspace Comcloud settings
 * @desc Platform Comcloud settings
 */


// Module name
exports.name = 'Crea tu configuración';

// Module description
exports.description = 'Comcloud module';

// Routes
exports.route_prefix = 'comcloud';

// Root path
var modulePath = process.cwd() + '/modules/comcloud';
exports.modulePath = modulePath;

// Paths
// Middlewares path
exports.middlewaresPath = modulePath + '/middlewares/';
// Models path
exports.modelsPath = modulePath + '/data/models/';
// Schemas path
exports.schemasPath = modulePath + '/data/schemas/';
// Views path
exports.viewsPath = modulePath + '/views/';
// Public path
exports.publicPath = modulePath + '/public/';
// Routes path
exports.routesPath = modulePath + '/routes/';

// Site settings
exports.highlights = true;

// Module actions
exports.actions = [];

// Wizard options
exports.steps = [
    {
        'step': 1,
        'title': 'Datos de tu empresa'
    },
    {
        'step': 2,
        'title': 'Servicios que deseas'
    },
    {
        'step': 3,
        'title': 'Finalizar'
    },
];