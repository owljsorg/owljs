var gulp = require('gulp'),
    path = require('path'),
    typescriptTodo = require(path.join(__dirname, 'typescript/todo/gulp.js')),
    babelTodo = require(path.join(__dirname, 'babel/todo/gulp.js')),
    webpackTodo = require(path.join(__dirname, 'webpack/todo/gulp.js'));


typescriptTodo(gulp);
babelTodo(gulp);
webpackTodo(gulp);

gulp.task('default', ['typescript-todo', 'babel-todo', 'webpack-todo']);