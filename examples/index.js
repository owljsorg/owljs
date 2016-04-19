var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var todo = require(__dirname + '/server/todo.js');

var app = express();

app.use(bodyParser.json());

app.use('/owl', serveStatic('../src/'));

app.use('/vanilla', serveStatic('vanilla', {
    'index': ['index.html']
}));

app.use('/vanilla/sample/*', serveStatic('vanilla/sample', {
    'index': ['index.html']
}));

todo(app);

http.createServer(app).listen(8080);