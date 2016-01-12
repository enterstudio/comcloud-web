
/**
 * Mongo manager
 */

var rek = require('rekuire'),
    _ = require('underscore'),
    mainSettings = rek('/settings'),
    fs = require('fs'),
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

            //console.log(_.omit(data, '_id'));

            if (req.busboy) {
                var dirPath = mainSettings.filesPath + data.author,
                    newPath = mainSettings.filesPath + data.author + '/logo.png',
                    pathTreat = newPath.replace(mainSettings.rootPath + '/public', '');

                req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

                    fs.exists(dirPath, function (exists) {
                        if (exists) {
                            file.pipe(fs.createWriteStream(newPath));
                        } else {
                            fs.mkdir(dirPath, 0755, function(err) {
                                if (!err) {
                                    file.pipe(fs.createWriteStream(newPath));
                                }
                            });
                        }
                    });
                });

                req.busboy.on('finish', function() {

                    cc_model.findOne({'author': data.author}, function(err, doc) {
                        if (err) { return next(err); }
                        if (doc) {
                            doc.logo = "/files/" + data.author + "/logo.png";
                            doc.save(function (err,d) {
                                if(err) throw err; // something went wrong
                            });
                            req.doc = doc
                            next();
                        }
                    });
                });

                req.pipe(req.busboy);

            } else {

                cc_model.findOneAndUpdate({'author': req.user._id}, _.omit(data, '_id'), function(err, doc) {
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
        }
    };
}

module.exports = mongoWrapper;
