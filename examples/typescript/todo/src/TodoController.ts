import owl from "../../../../typescript/owl";

module app {
    export class TodoController extends owl.Controller {
        private appView: app.AppView;
        private todoItemCollection: app.TodoItemCollection;

        constructor() {
            super();
            this.appView = <app.AppView>owl.require('appView');
        }
        init(): void {
            this.todoItemCollection = new app.TodoItemCollection();
            this.todoItemCollection.fetch()
                .then(() => {
                    this.showTodoView();
                });
        }
        destroy(): void {
            this.todoItemCollection.off();
        }
        showTodoView(): void {
            let todoView: TodoView = new TodoView({
                controller: this,
                collection: this.todoItemCollection
            });

            this.appView.showMain(todoView);
        }
        addItem(title: string): void {
            var todoItem: TodoItemModel = new TodoItemModel({
                title: title,
                isDone: false
            });
            todoItem.save().then(() => {
                this.todoItemCollection.fetch();
            });
        }
        setDone(index: number, isDone: boolean): void  {
            this.todoItemCollection.get(index).patch({
                isDone: isDone
            });
        }

    }
}