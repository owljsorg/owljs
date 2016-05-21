var owl = require('../../../../dist/owl-commonjs'),
    TodoItemCollection = require('./TodoItemCollection'),
    TodoView = require('./TodoView');

function TodoController() {
    this.appView = owl.require('appView');
}
TodoController.prototype = {
    readAll: function() {
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