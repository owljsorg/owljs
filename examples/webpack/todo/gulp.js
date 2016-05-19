var path = require('path'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream');

function init(gulp) {
    gulp.task('webpack-todo', ['webpack-todo-js']);
    gulp.task('webpack-todo-js', function () {
        return gulp.src([
            path.join(__dirname, 'src/**/*')
        ])
        .pipe(webpack({
            entry: {
                owl: path.join(__dirname, '../../../dist/owl-commonjs.js')
            },
            output: {
                filename: 'index.js',
            }
        }))
        .pipe(gulp.dest('webpack/todo/dist'));
    });
}

module.exports = init;