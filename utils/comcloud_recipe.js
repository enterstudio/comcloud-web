/**
 * @file comcloud_recipe.js
 * @namespace 
 * @desc Parse a doker compose recipe file 
 */


var fs = require('fs'),
    _ = require('underscore'),
    tar = require('tar-fs'),
    yaml = require('js-yaml'),
    FormData = require('form-data'),
    ncp = require('ncp').ncp;


var Recipe = function (path) {
    this._default_apps = ["packetfence", "casserver","corpportal-web", "corpportal-db"];
    this._path = path;
}

Recipe.prototype.compose = function(apps, host, token, cb){
    var compose_block = {}, 
        compose;
    var env = [];
    var path = this._path;

    try {
        var skel_compose = yaml.safeLoad(fs.readFileSync(this._path + "/recipes/docker-compose.yml", "utf-8"));
    } catch (e) {
        return console.log(e);
    }

    _.forEach(apps, function(app) {
        compose_block[app] = skel_compose[app];
        env.push("APP_" + app.toUpperCase() + "=true");
    });

    env.push("MASTER_FQDN=" + host);
    skel_compose["corpportal-web"].environment = env;
                
    _.forEach(this._default_apps, function(app) {
        compose_block[app] = skel_compose[app];
    });
        
    compose = yaml.safeDump(compose_block);

    fs.writeFile(path + "/recipes/docker-compose.yml", compose, function(err) {
        if (err) { throw err; }
        var domain = host.split('.')[1] + '.' + host.split('.')[2];
        var composeFile = path + "/recipes/docker-compose.yml";

        setConfig(composeFile, "comcloud-domain", domain);
        setConfig(path + '/installer', "{token}", token);
        setConfig(path + '/recipes/services/owncloud/data/config.php', 'TRUSTED_DOMAIN_HERE', host);
        setConfig(path + '/recipes/services/sparkweb/data/htdocs/index.html', 'TRUSTED_DOMAIN_HERE', host);

        fs.createReadStream(path + '/logo.png').pipe(fs.createWriteStream(path + '/recipes/data/company-logo.png'));
        return cb(path + "/recipes");
    });
    
};

var setConfig = function(file, setup, value){
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) { throw err; }
        var re = new RegExp(setup,"g");
        fs.writeFile(file, data.replace(re, value), 'utf8', function (err) {
            if (err) return console.log(err);
        });   
    });
}

module.exports = Recipe;