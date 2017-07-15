import * as owl from "../../../../typescript/owl";

module app {
    interface TodoCountData {
        countLeft: number;
    }
    export class TodoView extends owl.View{
        protected templateCount: Function;
        protected elements: {
            items: Element;
            count: Element;
            title: HTMLInputElement;
            counter: Element;
        };
        protected controller: TodoController;

        constructor(options: owl.IViewOptions) {
            super({
                className: 'v-todo',
                // you can use any template engine here
                template: function () {
                    return (
                        '<form>' +
                        '<h1>Todo list</h1>' +
                        '<input type="text" data-element="title" placeholder="Add a task" />' +
                        '<div data-element="counter" class="v-todo--counter"></div>' +
                        '</form>' +
                        '<div data-element="items"></div>' +
                        '<div data-element="count"></div>'
                    );
                },
                events: {
                    'keyup $title': 'keyup',
                    'submit form': 'submit'
                },
                collection: options.collection,
                controller: options.controller
            });
            this.templateCount = function (data: TodoCountData) {
                return (
                    '<div class="v-todo--count">' +
                    data.countLeft + ' items left' +
                    '</div>'
                );
            };
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.render();
            this.initListeners();
        }
        render(): void {
            this.el.innerHTML = this.template();
            this.update();
            this.renderItems();
            this.renderCount();
        }
        renderItems(): void {
            var items = this.collection.getModels();
            this.elements.items.innerHTML = '';
            items.forEach((model) => {
                var todoItemView = new app.TodoItemView({
                    model: model,
                    controller: this.controller
                });
                this.elements.items.appendChild(todoItemView.getEl());
            });
        }
        renderCount(): void {
            var countLeft = 0;
            this.collection.getModels().forEach(function(model) {
                if(!model.get('isDone')) {
                    countLeft++;
                }
            });
            this.elements.count.innerHTML = this.templateCount({
                countLeft: countLeft
            });
        }
        initListeners(): void {
            this.collection.on('change', () => {
                this.renderItems();
                this.renderCount();
            });
        }
        submit(element: HTMLElement, event: Event): void {
            var title: string;
            event.preventDefault();
            title = this.elements.title.value;
            this.controller.addItem(title);
            this.elements.title.value = '';
        }
        keyup(element: HTMLInputElement): void {
            this.elements.counter.innerHTML = element.value.length.toString() || '';
        };
    }
}
