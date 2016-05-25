define('TodoController', ['owl', 'appView', 'TodoItemCollection', 'TodoView'],
    function(owl, appView, TodoItemCollection, TodoView) {
    function TodoController() {}
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

                appView.showMain(todoView);
            });
        }
    };
    return TodoController;
});