var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require('vinyl-fs');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var htmlReplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var imgResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var webFonts = require('gulp-google-webfonts');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var svg2png = require('gulp-svg2png');
var reload = browserSync.reload;
var del = require('del');

var paths = {
  //IMPORTANT: Use to block tasks from parsing this massive directory!
  restricted: ['!node_modules/**/*', '!bower_components/**/*'],
  content: ['app/*.html'],
  styles: ['app/css/**/*.css'],
  scripts: ['app/js/**/*.js'],
  images: ['app/img/**/*'],
  icons: ['app/img/glyphs/*'],
  iconsTMP: ['app/img/glyphs/tmp'],
};


// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('build/img'));
});

//  Developement Preview
gulp.task('browser-sync', function() {
  browserSync.init({
    server: './app'
  });

  gulp.watch(paths.styles).on('change', reload);
  gulp.watch(paths.scripts).on('change', reload);
  gulp.watch(paths.content).on('change', reload);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browser-sync']);
