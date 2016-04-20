function init(app) {
    var todo = [];

    app.get('/todo/items', function(req, res) {
        res.send(JSON.stringify(todo));
    });

    app.post('/todo/items', function(req, res) {
        var id = (new Date()).getTime().toString() + Math.round(Math.random() * 100).toString();
        todo.push({
            id: id,
            title: req.body.title
        });
        res.send({
            id: id
        });
    });

    app.delete('/todo/items/:id', function(req, res) {

    });

    app.patch('/todo/items/:id', function(req, res) {
        var item = todo.find(function(item) {
            return item.id === req.params.id
        });
        if (item) {
            if(typeof req.body.isDone === 'boolean') {
                item.isDone = req.body.isDone;
            }
            res.send({});
        } else {
            res.send({}, 404);
        }
    });
}

module.exports = init;
