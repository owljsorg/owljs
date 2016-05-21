var path = require('path'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream');

function init(gulp) {
    gulp.task('webpack-todo', ['webpack-todo-js']);
    gulp.task('webpack-todo-js', function () {
        return gulp.src(path.join(__dirname, 'src/index.js'))
        .pipe(webpack({
            output: {
                filename: 'index.js',
            }
        }))
        .pipe(gulp.dest(path.join(__dirname, 'dist/')));
    });
}

module.exports = init;