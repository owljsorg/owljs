var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var todo = require(__dirname + '/server/todo.js');

var app = express();

app.use(bodyParser.json());

app.use('/', serveStatic('static/'));
app.use('/owl/src/', serveStatic('../src/'));
app.use('/owl/dist/', serveStatic('../dist/'));

app.use('/vanilla', serveStatic('vanilla', {
    'index': ['index.html']
}));

app.use('/typescript', serveStatic('typescript', {
    'index': ['index.html']
}));

app.use('/babel', serveStatic('babel', {
    'index': ['index.html']
}));

app.use('/webpack', serveStatic('webpack', {
    'index': ['index.html']
}));

app.use('/requirejs', serveStatic('requirejs', {
    'index': ['index.html']
}));

todo(app);

http.createServer(app).listen(8080);