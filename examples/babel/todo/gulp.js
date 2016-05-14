var path = require('path'),
    babel = require('gulp-babel');

function init(gulp) {
    gulp.task('babel-todo', ['babel-todo-js']);
    gulp.task('babel-todo-js', function () {
        return gulp.src(path.join(__dirname, 'src/**/*'))
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('babel/todo/dist'));
    });
}

module.exports = init;