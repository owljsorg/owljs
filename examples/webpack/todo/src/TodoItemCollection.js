var owl = require('owl.js'),
    TodoItemModel = require('./TodoItemModel');

function TodoItemCollection(data) {
    owl.Collection.call(this, data, {
        url: 'todo/items',
        model: TodoItemModel
    });
}
TodoItemCollection.prototype = Object.create(owl.Collection.prototype);

module.exports = TodoItemCollection;
