
/**
 * @file settings.js
 * Downloadsspace Downloads settings
 * @desc Platform Downloads settings
 */


// Module name
exports.name = 'Descargas';

// Module description
exports.description = 'Downloads module';

// Routes
exports.route_prefix = 'downloads';

// Root path
var modulePath = process.cwd() + '/modules/downloads';
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

// Comcloud Pckager
exports.comcloudPAckagerUrl = "localhost";