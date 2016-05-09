var path = require('path'),
    ts = require('gulp-typescript');

function init(gulp) {
    gulp.task('typescript-todo', ['typescript-todo-js']);
    gulp.task('typescript-todo-js', function () {
        return gulp.src(path.join(__dirname, 'src/index.ts'))
            .pipe(ts({
                noImplicitAny: true,
                out: 'index.js'
            }))
            .pipe(gulp.dest('typescript/todo/dist'));
    });
}

module.exports = init;