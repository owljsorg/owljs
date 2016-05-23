var path = require('path'),
    babel = require('gulp-babel');

function init(gulp) {
    gulp.task('react-todo', ['react-todo-js']);
    gulp.task('react-todo-js', function () {
        return gulp.src(path.join(__dirname, 'src/**/*'))
            .pipe(babel({
                presets: ['es2015', 'react']
            }))
            .pipe(gulp.dest('react/todo/dist'));
    });
}

module.exports = init;