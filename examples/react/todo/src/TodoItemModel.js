(function(app, owl) {
    class TodoItemModel extends owl.Model{
        constructor(data, options) {
            super(data, {
                urlRoot: 'todo/items',
                collection: options && options.collection,
                collectionIndex: options && options.collectionIndex
            });
        }
    }
    app.TodoItemModel = TodoItemModel;
})(app, owl);
