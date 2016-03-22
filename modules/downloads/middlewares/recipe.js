
/**
 * Recipe manager
 */

var rek = require('rekuire'),
    hat = require('hat'),
    _ = require('underscore'),
    fs = require('fs-extra'),
    tar = require('tar-fs'),
    FormData = require('form-data'),
    yaml = require('js-yaml'),
    ncp = require('ncp').ncp;

var mainSettings = rek('/settings'),
    cc_model = rek('modules/comcloud/data/models/model'),
    dtree = rek('utils/decision_tree'),
    Recipe = rek('utils/comcloud_recipe');

function recipeWrapper() {
    return function recipeWrapper(req, res) {
        if (req.method == 'POST') {
            var author = req.body.author;
            var path = "public/files/" + author;
            var requestToken = hat();

            cc_model.findOne({'author': author}, function(err, doc) {

                if (err) {
                    return err;
                }

                var dt = new dtree();
                var apps = dt.deduce(doc.communication, doc.info);
                var host = doc.domain.split('//')[1];
                var recipe = new Recipe(path);

                fs.ensureDir(path + "/recipe", copyFiles(err, 'skel_recipes', path + "/recipe"));
                recipe.compose(apps, host, requestToken, function(folder) {
                    console.log(folder);
                    pack(folder, path, function(file) {
                        console.log(file);
                        var form = new FormData();
                        form.append('recipes', fs.createReadStream(file));
                        form.append('requestToken', requestToken );
                        form.submit({
                            method: "POST",
                            host: mainSettings.comclodPackagerUrl,
                            port: 5000,
                            path: '/v1/recipe'
                        }, function(err, result) {
                            if(err) { throw err; }
                            result.resume();
                        });
                    });
                });
                res.json({
                    response: "ok",
                    object: apps
                });
            });
        }

    };
}

function pack(folder, path, cb) {
    var recipeFile = path + "/recipe.tar";
    var pack = require('tar-pack').pack;
    pack(folder)
        .pipe(fs.createWriteStream(recipeFile))
        .on('error', function (err) {
            console.error(err.stack)
        })
        .on('close', function () {
            return cb(recipeFile)
        })
}

var copyFiles = function copyFiles(err, skel, path) {
    if(err) { return console.log(err) }// => null
    try {
        fs.copySync(skel, path);
    } catch (err) {
        console.error('Oh no, there was an error: ' + err.message)
    }
};

module.exports = recipeWrapper;
