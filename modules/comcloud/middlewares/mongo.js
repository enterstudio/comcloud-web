
/**
 * Mongo manager
 */

var rek = require('rekuire'),
    _ = require('underscore'),
    cc_model = rek('modules/comcloud/data/models/model');

function mongoWrapper() {
    return function mongoWrapper(req, res, next) {
        if (req.method == 'GET') {
            cc_model.findOne({'author': req.user._id}, data, function(err, doc) {
                if (doc) {
                    req.doc = doc;
                    return next();
                } else {
                    return next();
                }

                if (err) {
                    return next(err);
                }
            });
            
        } else if (req.method == 'POST') {

            var data = req.body;
            data.author = req.user._id;

            cc_model.findOneAndUpdate({'author': req.user._id}, data, function(err, doc) {
                if (!doc) {
                    cc_model.create(data, function(error, obj) {
                        if (error) {
                            return next(error);
                        }
                        
                        return next();
                    });
                } else {
                    if (err) {
                        return next(err);
                    }

                    return next();
                }
            });
        }
    };
}

module.exports = mongoWrapper;