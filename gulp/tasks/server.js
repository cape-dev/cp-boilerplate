'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var livereload = require('gulp-livereload');
var forever = require('forever-monitor');
var runSequence = require('run-sequence');

var child, childOpts;

gulp.task('server', function() {

  livereload({
    basePath: config.dist.root,
    host: '0.0.0.0'
  });

  if (process.env.NODE_ENV === 'production') {
    console.log('Server started on localhost on port ' + config.server.prodPort);
    childOpts = {
      args: ['./build']
    };
  } else {
    console.log('Server started on localhost on port ' + config.server.devPort);
    childOpts = {
      args: ['./build'],
      watch: true,
      watchDirectory: config.devServer.watchDirectory,
      watchIgnorePatterns: config.devServer.watchIgnorePatterns
    };
  }

  child = forever.start(config.devServer.server, childOpts);
  
  child.on('watch:restart', restart);
  child.on('restart', restart);
  
  function restart() {
    runSequence('nodeScripts');
    console.log('restart server..');
    setTimeout(livereload.reload, 1000);
  }

});

gulp.task('server:restart', ['nodeScripts'], function() {
  if (child) {
    child.restart();
  }
});
