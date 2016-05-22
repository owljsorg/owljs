define('TodoItemModel', ['owl'], function(owl) {
    function TodoItemModel(data, options) {
        owl.Model.call(this, data, {
            urlRoot: 'todo/items',
            collection: options && options.collection
        });
    }
    TodoItemModel.prototype = Object.create(owl.Model.prototype);
    return TodoItemModel;
});