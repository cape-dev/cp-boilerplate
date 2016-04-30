'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;
  process.env.NODE_ENV = 'development';

  runSequence('bootstrap', 'flagIcon', 'nodeScripts', 'styles', 'images',
    'views', 'misc', 'templateCache', 'preprocess', 'browserify', 'watch', 'server', cb);

});
