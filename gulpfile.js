var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');


gulp.task('sass', function(){
  return gulp.src(__dirname + '/development/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(__dirname + '/app/public/css'));
});

gulp.task('watch', ['sass'], function(){
  gulp.watch(__dirname + '/development/scss/**/*.scss', ['sass']);
  gulp.watch(__dirname + '/app/public/nunjucks/**/*.njk');
  gulp.watch(__dirname + '/app/public/scripts/**/*.js');
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js, json',
  }).on('quit', function () {
    process.exit(0);
  });
});

gulp.task('default', function (done) {
  runSequence('watch', 'sass', 'server', done);
});
