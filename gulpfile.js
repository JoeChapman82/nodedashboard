/*jshint esversion: 6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');

const scriptsToConcat = [__dirname + '/development/scripts/charts-master.js', __dirname + '/development/scripts/progress-meters.js', __dirname + '/development/scripts/scheduler.js', __dirname + '/development/scripts/main.js', __dirname + '/development/scripts/master-widget-scripts.js'];


gulp.task('sass', function(){
  return gulp.src(__dirname + '/development/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(__dirname + '/app/public/css'))
  .pipe(browserSync.reload({
  stream: true
}));
});

gulp.task('watch', ['sass'], function(){
  gulp.watch([__dirname + '/development/scss/**/*.scss', __dirname + '/development/widgets/**/*.scss'], ['concat-widgets-sass', 'sass'], browserSync.reload());
  gulp.watch(__dirname + '/development/widgets/**/*.njk', ['copy-widgets-nunjucks'], browserSync.reload());
  gulp.watch([__dirname + '/development/scripts/**/*.js', __dirname + '/development/widgets/**/*.js'], ['concat-widgets-scripts', 'concat-all-scripts', 'uglyjs'], browserSync.reload());
});

gulp.task('uglyjs', function (cb) {
  pump([
    gulp.src(__dirname + '/development/scripts/all-scripts.js'),
    uglify(),
    gulp.dest(__dirname + '/app/public/scripts')
  ],
  cb
)
.pipe(browserSync.reload({
stream: true
}));
});

gulp.task('copy-widgets-nunjucks', function() {
  gulp.src(__dirname + '/development/widgets/**/*.njk')
  .pipe(flatten())
 .pipe(gulp.dest(__dirname + '/app/public/nunjucks/partials/widgets'));
});

gulp.task('concat-widgets-scripts', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.js')
    .pipe(concat('master-widget-scripts.js'))
    .pipe(gulp.dest(__dirname + '/development/scripts'));
});

gulp.task('concat-all-scripts', function() {
  return gulp.src(scriptsToConcat)
    .pipe(concat('all-scripts.js'))
    .pipe(gulp.dest(__dirname + '/development/scripts'));
});

gulp.task('concat-widgets-sass', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.scss')
    .pipe(concat('_master-widget-sass.scss'))
    .pipe(gulp.dest(__dirname + '/development/scss'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'localhost:3000',
    port: 3001,
    reloadDelay: 3000,
    ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
},
    open: false
  });
});

gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
  }).on('quit', function() {
    process.exit(0);
  });
});

gulp.task('default', function (done) {
  runSequence('concat-widgets-sass', 'concat-widgets-scripts', 'concat-all-scripts', 'copy-widgets-nunjucks', 'watch', 'sass', 'uglyjs', 'server', 'browserSync', done);
});


// TODO add linting tasks etc
gulp.task('build', function (done) {
  runSequence('concat-widgets-sass', 'concat-widgets-scripts', 'concat-all-scripts', 'copy-widgets-nunjucks', 'sass', 'uglyjs', 'rename-master-script', done);
});
