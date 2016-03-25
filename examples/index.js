var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');

var app = express();

app.get('/thing/*', function(req, res) {
    res.send(JSON.stringify({
        id: 123
    }))
});

app.use('/owl', serveStatic('../src/'));

app.use('/vanilla', serveStatic('vanilla', {
    'index': ['index.html']
}));

app.use('/vanilla/sample/*', serveStatic('vanilla/sample', {
    'index': ['index.html']
}));

http.createServer(app).listen(8080);