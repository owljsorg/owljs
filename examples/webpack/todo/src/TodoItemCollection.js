(function(app, owl) {
    function TodoItemCollection(data) {
        owl.Collection.call(this, data, {
            url: 'todo/items',
            model: app.TodoItemModel
        });
    }
    TodoItemCollection.prototype = Object.create(owl.Collection.prototype);
    app.TodoItemCollection = TodoItemCollection;
})(app, owl);
