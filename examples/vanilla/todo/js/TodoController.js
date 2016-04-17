(function (app, owl) {
    function TodoController() {
        this.appView = owl.require('appView');
    }
    TodoController.prototype = {
        readAll: function() {
            var todoItemCollection,
                todoView;

            todoItemCollection = new app.TodoItemCollection();

            todoView = new app.TodoView({
                controller: this,
                collection: todoItemCollection
            });

            this.appView.showMain(todoView);
        }
    };
    app.TodoController = TodoController;
})(app, owl);