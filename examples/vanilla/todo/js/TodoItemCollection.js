(function(app, owl) {
    function TodoItemCollection(data) {
        owl.Collection.call(this, data, {
            url: 'todo/items'
        });
    }
    TodoItemCollection.prototype = Object.create(owl.Collection.prototype);
    app.TodoItemCollection = TodoItemCollection;
})(app, owl);