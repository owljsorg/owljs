(function(app, owl) {
    function TodoItemModel(data) {
        owl.Model.call(this, data, {
            urlRoot: 'todo/items'
        });
    }
    TodoItemModel.prototype = Object.create(owl.Model.prototype);
    app.TodoItemModel = TodoItemModel;
})(app, owl);