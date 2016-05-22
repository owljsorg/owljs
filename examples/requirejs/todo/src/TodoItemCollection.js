define('TodoItemCollection', ['owl', 'TodoItemModel'], function(owl, TodoItemModel) {
    function TodoItemCollection(data) {
        owl.Collection.call(this, data, {
            url: 'todo/items',
            model: TodoItemModel
        });
    }
    TodoItemCollection.prototype = Object.create(owl.Collection.prototype);
    return TodoItemCollection;
});
