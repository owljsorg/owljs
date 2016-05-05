var path = require('path'),
    ts = require('gulp-typescript');

function init(gulp) {
    gulp.task('typescript-todo', ['typescript-todo-js']);
    gulp.task('typescript-todo-js', function () {
        return gulp.src(path.join(__dirname, 'js/index.ts'))
            .pipe(ts({
                noImplicitAny: true,
                out: 'index.js'
            }))
            .pipe(gulp.dest('js-dist'));
    });
}

module.exports = init;