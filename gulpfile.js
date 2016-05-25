var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    wrapper = require('gulp-module-wrapper'),
    path = require('path'),

    files = [
        'src/owl.js',
        'src/owl.history.js',
        'src/owl.util.js',
        'src/owl.Router.js',
        'src/owl.View.js',
        'src/owl.Model.js',
        'src/owl.Collection.js',
        'src/owl.Controller.js',

        'src/owl.ajax.js',
        'src/owl.Promise.js'
    ],

    filesCommonjs = [
        'src/owl-commonjs.js',
        'src/owl.history.js',
        'src/owl.util.js',
        'src/owl.Router.js',
        'src/owl.View.js',
        'src/owl.Model.js',
        'src/owl.Collection.js',
        'src/owl.Controller.js',

        'src/owl.ajax.js',
        'src/owl.Promise.js'
    ],

    filesAmd = [
        'src/owl-amd.js',
        'src/owl.history.js',
        'src/owl.util.js',
        'src/owl.Router.js',
        'src/owl.View.js',
        'src/owl.Model.js',
        'src/owl.Collection.js',
        'src/owl.Controller.js',

        'src/owl.ajax.js',
        'src/owl.Promise.js'
    ];

gulp.task('default', ['build', 'build-commonjs', 'build-amd']);

gulp.task('build', function() {
    gulp.src(files)
        .pipe(concat('owl.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-commonjs', function() {
    gulp.src(filesCommonjs)
        .pipe(concat('owl-commonjs.js'))
        .pipe(wrapper({
            type: 'commonjs',
            exports: 'owl'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-amd', function() {
    gulp.src(filesAmd)
        .pipe(concat('owl.js'))
        .pipe(wrapper({
            type: 'amd',
            exports: 'owl'
        }))
        .pipe(uglify())
        .pipe(rename('owl-amd.min.js'))
        .pipe(gulp.dest('dist/'));
});
