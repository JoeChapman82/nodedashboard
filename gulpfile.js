var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
// var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src(__dirname + '/development/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(__dirname + '/app/public/css'));
});

gulp.task('watch', ['sass'], function(){
  gulp.watch(__dirname + '/development/scss/**/*.scss', ['sass']);
  gulp.watch(__dirname + '/app/public/nunjucks/**/*.njk', ['concat-njk-widgets']);
  gulp.watch(__dirname + '/development/scripts/**/*.js', ['uglyjs']);
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

gulp.task('concat-njk-widgets', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.njk')
    .pipe(concat('master-widgets.njk'))
    .pipe(gulp.dest(__dirname + '/app/public/nunjucks/widgets'));
});

gulp.task('concat-scripts', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.js')
    .pipe(concat('master-widget-scripts.js'))
    .pipe(gulp.dest(__dirname + '/development/scripts'));
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  }).on('quit', function () {
    process.exit(0);
  });
});

gulp.task('default', function (done) {
  runSequence('watch', 'sass', 'concat-scripts', 'uglyjs', 'concat-njk-widgets', 'server', done);
});
