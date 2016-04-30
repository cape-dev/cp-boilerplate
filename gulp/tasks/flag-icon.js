var gulp = require('gulp');
var config = require('../config');

gulp.task('flagIcon', function() {
  return gulp.src(config.flagIcon.src)
    .pipe(gulp.dest(config.flagIcon.dest));
});
