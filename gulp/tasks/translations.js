'use strict';

var config     = require('../config');
var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('translations', function() {

  var src = config.translations.src;

  return gulp.src(src)
    .pipe(gulp.dest(config.translations.dest));
});
