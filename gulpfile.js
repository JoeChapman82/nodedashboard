/*jshint esversion: 6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');

gulp.task('sass', function(){
  return gulp.src(__dirname + '/development/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(__dirname + '/app/public/css'))
  .pipe(browserSync.reload({
  stream: true
}));
});

gulp.task('watch', ['sass'], function(){
  gulp.watch([__dirname + '/development/scss/**/*.scss', __dirname + '/development/widgets/**/*.scss'], ['sass'], browserSync.reload());
  gulp.watch([__dirname + '/app/public/**/*.njk', __dirname + '/development/widgets/**/*.njk'], ['concat-widgets-njk'], browserSync.reload());
  gulp.watch([__dirname + '/development/scripts/**/*.js', __dirname + '/development/widgets/**/*.js'], ['concat-widgets-scripts', 'uglyjs'], browserSync.reload());
});

gulp.task('uglyjs', function (cb) {
  pump([
    gulp.src(__dirname + '/development/scripts/**/*.js'),
    uglify(),
    gulp.dest(__dirname + '/app/public/scripts')
  ],
  cb
)
.pipe(browserSync.reload({
stream: true
}));
});

gulp.task('concat-widgets-njk', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.njk')
    .pipe(concat('master-widgets.njk'))
    .pipe(gulp.dest(__dirname + '/app/public/nunjucks/widgets'))
    .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('concat-widgets-scripts', function() {
  return gulp.src(__dirname + '/development/widgets/**/*.js')
    .pipe(concat('master-widget-scripts.js'))
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
    port: 3001
  });
});

gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js, njk',
  }).on('quit', function() {
    process.exit(0);
  });
});

gulp.task('default', function (done) {
  runSequence('concat-widgets-sass', 'concat-widgets-scripts', 'concat-widgets-njk', 'watch', 'sass', 'uglyjs', 'server', 'browserSync', done);
});


// TODO add linting tasks etc
gulp.task('build', function (done) {
  runSequence('concat-widgets-sass', 'concat-widgets-scripts', 'concat-widgets-njk', 'sass', 'uglyjs', done);
});
