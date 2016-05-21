var owl = require('../../../../dist/owl-commonjs'),
    TodoItemModel = require('./TodoItemModel');

function TodoItemCollection(data) {
    owl.Collection.call(this, data, {
        url: 'todo/items',
        model: TodoItemModel
    });
}
TodoItemCollection.prototype = Object.create(owl.Collection.prototype);

module.exports = TodoItemCollection;
