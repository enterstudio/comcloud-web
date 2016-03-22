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
    this._recipePath = path + "/recipe";
    this._path = path;
}

Recipe.prototype.compose = function(apps, fqdn, token, cb){
    var compose_block = {}, 
        compose;
    var env = [];
    var path = this._path;
    var recipePath = this._recipePath;

    try {
        var skel_compose = yaml.safeLoad(fs.readFileSync(this._recipePath + "/package/docker-compose.yml", "utf-8"));
    } catch (e) {
        return console.log(e);
    }

    _.forEach(apps, function(app) {
        compose_block[app] = skel_compose[app];
        env.push("APP_" + app.toUpperCase() + "=true");
    });

    env.push("MASTER_FQDN=" + fqdn);
    skel_compose["corpportal-web"].environment = env;
                
    _.forEach(this._default_apps, function(app) {
        compose_block[app] = skel_compose[app];
    });

    compose = yaml.safeDump(compose_block);

    fs.writeFile(recipePath + "/package/docker-compose.yml", compose, function(err) {
        if (err) { throw err; }
        var domain = fqdn.split('.')[1] + '.' + fqdn.split('.')[2];
        var host = fqdn.split('.')[0];
        var composeFile = recipePath + "/package/docker-compose.yml";

        //setConfig(composeFile, 'FQDN_HERE', fqdn);
        setConfig(composeFile, 'HOST_HERE', host);
        setConfig(composeFile, 'DOMAIN_HERE', domain);

        setConfig(recipePath + '/installer', "{token}", token);

        setConfig(recipePath + '/package/services/owncloud/data/config.php', 'FQDN_HERE', fqdn);
        //setConfig(recipePath + '/package/services/sparkweb/data/htdocs/index.html', 'FULL_DOMAIN_HERE', fqdn);
        setConfig(recipePath + '/package/services/kaiwa-client/Dockerfile', 'FQDN_HERE', fqdn);
        setConfig(recipePath + '/package/services/kaiwa-client/Dockerfile', 'DOMAIN_HERE', domain);

        setConfig( recipePath + '/package/services/kaiwa-client/app/config/dev_config.json', 'FQDN_HERE', fqdn);
        setConfig( recipePath + '/package/services/kaiwa-client/app/config/dev_config.json', 'DOMAIN_HERE', domain);
        setConfig( recipePath + '/package/services/kaiwa-client/app/config/dev_config.json', 'HOST_HERE', host);

        setConfig( recipePath + '/package/services/kaiwa-server/Dockerfile', 'FQDN', fqdn);
        
        setConfig( recipePath + '/package/services/kaiwa-server/app/config/prosody.cfg.lua', 'FQDN_HERE', fqdn);
        setConfig( recipePath + '/package/services/kaiwa-server/app/config/prosody.cfg.lua', 'DOMAIN_HERE', domain);
        
        setConfig( recipePath + '/package/services/zimbra/data/start.sh', 'DOMAIN_HERE', domain);
        //setConfig( path + '/package/services/kaiwa-server/app/config/prosody.cfg.lua', 'FQDN_HERE', fqdn);
        fs.createReadStream(path + '/logo.png').pipe(fs.createWriteStream(recipePath + '/package/data/company-logo.png'));
        return cb(recipePath  + "/package");
    });    
};

function setConfig(file, setup, value){
    var data = fs.readFileSync(file, 'utf8');
    var re = new RegExp(setup,"g");
    fs.writeFileSync(file, data.replace(re, value), 'utf8');
}

module.exports = Recipe;