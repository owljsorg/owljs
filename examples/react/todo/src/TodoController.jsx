(function(app, owl) {
    class TodoController extends owl.Controller{
        constructor() {
            super();
            this.appView = owl.require('appView');
        }
        init() {
            this.todoItemCollection = new app.TodoItemCollection();
            this.todoItemCollection.on('change', () => {
                this.showTodoView();
            });
            this.todoItemCollection.fetch();
        }
        destroy() {
            this.todoItemCollection.off();
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
