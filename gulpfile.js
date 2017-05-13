const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const wrapper = require('gulp-module-wrapper');
const path = require('path');

const filesAjax = [
    'src/owl.ajax.js',
    'src/owl.Promise.js',
    'src/owl.AjaxError.js'
];

const filesCore = [
    'src/owl.history.js',
    'src/owl.util.js',
    'src/owl.EventEmitter.js',
    'src/owl.Router.js',
    'src/owl.Model.js',
    'src/owl.Collection.js',
    'src/owl.Controller.js',
    ...filesAjax
];

const files = [
    'src/owl.js',
    'src/owl.View.js',
    ...filesCore
];

gulp.task('default', ['build', 'build-core', 'build-commonjs', 'build-commonjs-ajax', 'build-amd']);

gulp.task('build', function() {
    gulp.src(files)
        .pipe(concat('owl.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-commonjs', function() {
    gulp.src([
            'src/owl-commonjs.js',
            ...filesCore
        ])
        .pipe(concat('owl-commonjs.js'))
        .pipe(wrapper({
            type: 'commonjs',
            exports: 'owl'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-core', function() {
    gulp.src([
            'src/owl-commonjs.js',
            ...filesCore
        ])
        .pipe(concat('owl-commonjs-core.js'))
        .pipe(wrapper({
            type: 'commonjs',
            exports: 'owl'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-commonjs-ajax', function() {
    gulp.src(filesAjax)
        .pipe(concat('owl-commonjs-ajax.js'))
        .pipe(wrapper({
            type: 'commonjs',
            exports: 'owl'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-amd', function() {
    gulp.src([
            'src/owl-amd.js',
            ...filesCore
        ])
        .pipe(concat('owl.js'))
        .pipe(wrapper({
            type: 'amd',
            exports: 'owl'
        }))
        .pipe(uglify())
        .pipe(rename('owl-amd.min.js'))
        .pipe(gulp.dest('dist/'));
});
