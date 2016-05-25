module app {
    export class TodoItemView extends owl.View{
        protected controller: TodoController;

        constructor(options: owl.ViewOptions) {
            super({
                className: 'v-todo',
                // you can use any template engine here
                template: function (data: TodoItem) {
                    return (
                        '<label class="checkbox">' +
                        '<input data-element="checkbox" type="checkbox" ' + (data.isDone ? 'checked="checked"' : '') + ' />' +
                        '<span>' + data.title + '</span>' +
                        '</label>'
                    );
                },
                events: {
                    'change $checkbox': 'change'
                },
                model: options.model,
                controller: options.controller
            });
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.render();
            this.initListeners();
        }
        render(): void {
            this.el.innerHTML = this.template(this.model.getData());
            this.update();
        };
        change(element: HTMLInputElement, event: Event): void {
            event.preventDefault();
            this.controller.setDone(this.model.getCollectionIndex(), element.checked);
        };
        initListeners(): void {
            this.model.on('change', () => {
                this.render();
            });
        };
    }
}
