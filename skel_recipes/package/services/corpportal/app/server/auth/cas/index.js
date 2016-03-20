'use strict';

var express = require('express');
var http = require('http');
var querystring = require('querystring');
var config = require('../../config/environment');


var router = express.Router();

router.post('/', function(req, res, next) {
  //console.log('Received username: '+req.body.username+' and password: '+req.body.password+'.');

  // Call cas-server rest api to authenticate user
  var options = {
    host: config.casserver.host,
    port: 8080,
    path: '/cas/v1/tickets',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var casreq = http.request(
    options,
    function(casres){
      if(casres.statusCode===201){ // correct credentials, user accepted. Parse TGT.
        console.log("User '"+req.body.username+"' accepted by CAS.")
        var tgt;
        var body = '';
        casres.setEncoding('utf8');
        casres.on('data', function (chunk) {
          body += chunk;
        });
        casres.on('end', function () {
          var re = /\/v1\/tickets\/(.*)\"\smethod.*/g;
          var m;
          if ((m = re.exec(body)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            tgt = m[1]
          }
          console.log("Obtained TGT from CAS for '"+req.body.username+"' : "+tgt)
          res.status(200).json({castgc:tgt, user:req.body.username});
        });

      }else if(casres.statusCode===400){ // incorrect credentials.
        // error logging
        console.log("User '"+req.body.username+"' NOT accepted by CAS. Wrong password or user do not exists.")
        res.status(401).json({error:"unauthorized"});
      }else if(casres.statusCode===415){ // Cas cannot understand request
        res.status(500).json({error:"protocol error between CAS and this service."});
      }else{ // Other error
        res.status(500).json({error:"error in communication with CAS"});
      }
        /*
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));

      */
    }
  );

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  casreq.write(querystring.stringify({'username' : req.body.username, 'password' : req.body.password}));
  casreq.end();
})


module.exports = router;
