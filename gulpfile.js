var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

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

gulp.task('uglyjs', function (cb) {
  pump([
    gulp.src(__dirname + '/development/scripts/**/*.js'),
    uglify(),
    gulp.dest(__dirname + '/app/public/scripts')
  ],
  cb
);
});

gulp.task('concat', function() {
  return gulp.src(__dirname + '/public/nunjucks/widgets/*.njk')
    .pipe(concat('all.njk'))
    .pipe(gulp.dest(__dirname + '/public/testFolder'));
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
  runSequence('watch', 'sass', 'uglyjs', 'concat', 'server', done);
});
