
var gulp = require('gulp');
var sass = require('gulp-sass');
var js = require('./bin/build.js');

gulp.task('build:js', js.build); 

gulp.task('watch:js', js.watch);

gulp.task('build:css', function() {
  return gulp.src('./src/css/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/build/bundle.css'));
});
 
gulp.task('watch:css', function() {
  gulp.watch('./src/css/**/*.scss', ['build:css']);
});


gulp.task('build', ['build:js', 'build:css']);

gulp.task('watch', ['watch:js', 'watch:css']);

