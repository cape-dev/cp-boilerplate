var config = require('../config');
var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
  livereload.listen({start: true});
  
  gulp.watch(config.scripts.preprocess.watch, ['preprocess']);
  gulp.watch(config.views.cache.watch, ['templateCache']);
  gulp.watch(config.views.watch, ['views']);
  gulp.watch(config.styles.watch,  ['styles']);
  gulp.watch(config.images.watch,  ['images']);
  gulp.watch(config.translations.watch, ['translations']);
});
