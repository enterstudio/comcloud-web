
/**
 * Wizard manager
 */

var rek = require('rekuire');

function wizardWrapper(module) {
    return function wizardWrapper(req, res, next) {
        next();
    };
}

module.exports = wizardWrapper;