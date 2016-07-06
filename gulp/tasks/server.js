'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var livereload = require('gulp-livereload');
var forever = require('forever-monitor');
var runSequence = require('run-sequence');

var child;

gulp.task('server', function() {

  livereload({
    basePath: config.dist.root,
    host: '0.0.0.0'
  });
  child = forever.start(config.devServer.server, {
    args: ['./build'],
    watch: true,
    watchDirectory: config.devServer.watchDirectory,
    watchIgnorePatterns: config.devServer.watchIgnorePatterns
  });

  if (process.env.NODE_ENV === 'production') {
    console.log('Server started on localhost on port ' + config.server.prodPort);
  } else if (process.env.NODE_ENV === 'productionTest') {
    console.log('Server started on localhost on port ' + config.server.prodTestPort);
  } else {
    console.log('Server started on localhost on port ' + config.server.devPort);
  }

  child.on('start', function() {
    livereload.listen({start: true});
  });
  child.on('watch:restart', function() {
    runSequence('nodeScripts');
    console.log('restart server..');
    setTimeout(livereload.reload, 1000);
  });

});

gulp.task('server:restart', ['nodeScripts'], function() {
  if (child) {
    child.restart();
  }
});
