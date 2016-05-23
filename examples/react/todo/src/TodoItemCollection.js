(function(app, owl) {
    class TodoItemCollection extends owl.Collection{
        constructor(data) {
            super(data, {
                url: 'todo/items',
                model: app.TodoItemModel
            });
        }
    }
    app.TodoItemCollection = TodoItemCollection;
})(app, owl);