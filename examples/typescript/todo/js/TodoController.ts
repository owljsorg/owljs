module app {
    export class TodoController {
        private appView: owl.View;

        constructor() {
            this.appView = <owl.View>owl.require('appView');
        }
        readAll() {
            /*
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
            */
        }
    }
}