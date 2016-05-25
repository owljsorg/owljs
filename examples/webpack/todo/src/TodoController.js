var owl = require('owl.js'),
    TodoItemCollection = require('./TodoItemCollection'),
    TodoView = require('./TodoView');

function TodoController() {
    this.appView = require('./appView');
}
TodoController.prototype = {
    init: function() {
        var that = this,
            todoItemCollection,
            todoView;

        todoItemCollection = new TodoItemCollection();
        todoItemCollection.fetch().then(function() {
            todoView = new TodoView({
                controller: this,
                collection: todoItemCollection
            });

            that.appView.showMain(todoView);
        });
    }
};
module.exports = TodoController;