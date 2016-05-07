module app {
    export class TodoItemCollection extends owl.Collection{
        constructor(data?: Array<app.TodoItem>) {
            super(data, {
                url: 'todo/items',
                model: app.TodoItemModel
            });
        }
    }
}
