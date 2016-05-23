(function(app, owl) {
    class TodoController {
        constructor() {
            this.appView = owl.require('appView');
            this.todoItemCollection = new app.TodoItemCollection();
            this.todoItemCollection.on('change', () => {
                this.showTodoView();
            });
        }
        readAll() {
            this.todoItemCollection.fetch();
        }
        showTodoView() {
            this.appView.show(
                <app.TodoView
                    controller={this}
                    items={this.todoItemCollection}
                />
            );
        }
        addItem(title) {
            var todoItem = new app.TodoItemModel({
                title: title,
                isDone: false
            });
            todoItem.save().then(() => {
                this.todoItemCollection.fetch();
            });
        }
        setDone(index, value) {
            this.todoItemCollection.get(index).patch({
                isDone: value
            });
        }
    }
    app.TodoController = TodoController;
})(app, owl);
