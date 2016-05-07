module app {
    export class TodoController {
        private appView: app.AppView;

        constructor() {
            this.appView = <app.AppView>owl.require('appView');
        }
        readAll() {
            let todoItemCollection: TodoItemCollection,
                todoView: TodoView;

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
}