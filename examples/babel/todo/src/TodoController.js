(function(app, owl) {
    class TodoController {
        constructor() {
            this.appView = owl.require('appView');
        }
        readAll() {
            let todoItemCollection,
                todoView;
    
            todoItemCollection = new app.TodoItemCollection();
            todoItemCollection.fetch().then(() => {
                todoView = new app.TodoView({
                    controller: this,
                    collection: todoItemCollection
                });
    
                this.appView.showMain(todoView);
            });
        }
    }
    app.TodoController = TodoController;
})(app, owl);
