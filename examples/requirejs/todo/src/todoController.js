define('todoController', ['owl', 'appView', 'TodoItemCollection', 'TodoView'],
    function(owl, appView, TodoItemCollection, TodoView) {
TodoView
    function TodoController() {}
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

                appView.showMain(todoView);
            });
        }
    };
    return new TodoController();
});