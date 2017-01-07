'user strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Beep"
                })(err);

        this.emit('end');
    };

gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))//:nested//:compact//:expanded//:compressed
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(notify({ message: 'SCSS - tarea completada' }));
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/dist/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: onError}))
    .pipe(uglify())
    .pipe(concat('function.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'))
    .pipe(notify({ message: 'JS - tarea completada' }));
});

gulp.task('default',['sass','scripts']);

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/sass/**/*.scss', ['sass']);

   // Watch .js files
  gulp.watch('src/js/dist/*.js', ['scripts']);

});
