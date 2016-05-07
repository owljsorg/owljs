module app {
    export interface TodoItem {
        isDone: boolean;
    }
    export class TodoItemModel extends owl.Model{
        constructor(data: TodoItem, options?: owl.ModelOptions) {
            super(data, {
                urlRoot: 'todo/items',
                collection: options && options.collection
            });
        }
    }
}