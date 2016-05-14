var gulp = require('gulp'),
    path = require('path'),
    typescriptTodo = require(path.join(__dirname, 'typescript/todo/gulp.js'));
    babelTodo = require(path.join(__dirname, 'babel/todo/gulp.js'));


typescriptTodo(gulp);
babelTodo(gulp);

gulp.task('default', ['typescript-todo', 'babel-todo']);