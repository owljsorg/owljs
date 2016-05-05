var gulp = require('gulp'),
    path = require('path'),
    typescriptTodo = require(path.join(__dirname, 'typescript/todo/gulp.js'));


typescriptTodo(gulp);

gulp.task('default', ['typescript-todo']);