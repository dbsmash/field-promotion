'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
// Load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/*.*')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['./bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// images
gulp.task('images', function () {
    return gulp.src('app/images/*.*')
        .pipe(gulp.dest('dist/images'));
});

// Scripts
gulp.task('scripts', function() {
    browserify(['./app/scripts/app.js'])
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images', 'dist'], {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'images', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});


// Bower helper
gulp.task('bower', function() {
    gulp.src('bower_components/**/*.js', {base: 'bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});
