var path = require('path'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream');

function init(gulp) {
    gulp.task('webpack-todo', ['webpack-todo-js']);
    gulp.task('webpack-todo-js', function () {
        return gulp.src(path.join(__dirname, 'src/**/*'))
            .pipe(webpack())
            .pipe(gulp.dest('webpack/todo/dist'));
    });
}

module.exports = init;