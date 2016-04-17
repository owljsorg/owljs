function init(app) {
    var todo = [];

    app.get('/todo/items', function(req, res) {
        res.send(JSON.stringify(todo));
    });

    app.post('/todo/items', function(req, res) {

    });

    app.delete('/todo/items/:id', function(req, res) {

    });

    app.patch('/todo/items/:id', function(req, res) {

    });
}

module.exports = init;
