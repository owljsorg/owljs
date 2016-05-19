(function (app, owl) {
    function TodoController() {
        this.appView = owl.require('appView');
    }
    TodoController.prototype = {
        readAll: function() {
            var that = this,
                todoItemCollection,
                todoView;

            todoItemCollection = new app.TodoItemCollection();
            todoItemCollection.fetch().then(function() {
                todoView = new app.TodoView({
                    controller: this,
                    collection: todoItemCollection
                });

                that.appView.showMain(todoView);
            });
        }
    };
    app.TodoController = TodoController;
})(app, owl);