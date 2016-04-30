'use strict';

var http = require('http');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var tiny = require('tiny-di');
var path = require('path');
var fsQ = require('q-io/fs');
var q = require('q');
var jsonfile = require('jsonfile');

module.exports = Daemon;

function Daemon(logFunc, config) {

  // Prepare dependency injection
  var $injector = new tiny();
  $injector.bind('$injector').to($injector);
  $injector.setResolver(dependencyResolver);

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));

  // Setup APIv1 router
  var apiv1router = express.Router({'caseSensitive': true});
  apiv1router.use(bodyParser.json());
  apiv1router.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use('/api/v1', apiv1router);


  // link injected variables
  $injector
    .bind('config').to(config)
    .bind('server').to(server)
    .bind('apiv1').to(apiv1router)
    .bind('logFunc').to(logFunc)
    .bind('q').to(q)
    .bind('path').to(path)
    .bind('fsQ').to(fsQ)
    .bind('jsonfile').to(jsonfile);

  // Load all modules, specified in gulp/config.js (server.modules)
  loadExtensions();
  loadModules();

  runServer();

  function runServer() {
    var s = http.createServer(server);
    s.on('error', function(err) {
      if (err.code === 'EADDRINUSE') {
        if (isProd()) {
          logFunc('Development server is already started at port ' + config.server.prodPort);
        } else {
          logFunc('Development server is already started at port ' + config.server.devPort);
        }
      } else {
        throw err;
      }
    });

    if (isProd()) {
      s.listen(config.server.prodPort);
    } else {
      s.listen(config.server.devPort);
    }
  }

  function loadModules() {
    config.server.modules.forEach(function(module) {
      var file = module.file || module.module;
      $injector.bind(module.module).load(file);
    });
  }

  function loadExtensions() {
    config.server.extensions.forEach(function(extension) {
      var file = extension.file || extension.extension;
      $injector.bind(extension.extension).load(file);
    });
  }

  function dependencyResolver(moduleId) {
    var modulePath = path.resolve(path.join(config.dist.root, config.server.path, moduleId));
    try {
      return require(modulePath);
    } catch (e) {
      try {
        return require(moduleId);
      } catch (e2) {
        console.log('Extension ' + moduleId + ' failed to load');
        console.log(modulePath);
        console.log('errors', e, e2);
        console.log(new Error().stack);
        return false;
      }
    }
  }
  
  function isProd() {
    return process.env.NODE_ENV === 'production';
  }
}
