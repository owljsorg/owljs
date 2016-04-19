(function(app, owl) {
    function TodoView(options) {
        owl.View.call(this, {
            className: 'v-todo',
            // you can use any templating engine here
            template: function(data) {
                return (
                    '<form>' +
                        '<input data-element="title" placeholder="Add a task" />' +
                        '<div data-element="counter" class="v-todo--counter"></div>' +
                    '</form>' +
                    '<div data-element="items"></div>'
                );
            },
            events: {
                'keyup $title': 'keyup',
                'submit form': 'submit'
            },
            collection: options.collection
        });
        // update links to data-element
        // and update special events (submit, focus, blur)
        this.render();
    }
    TodoView.prototype = Object.create(owl.View.prototype);
    TodoView.prototype.render = function() {
        this.el.innerHTML = this.template();
        this.update();
        this.renderItems();
    };
    TodoView.prototype.renderItems = function() {
        var that = this,
            items = this.collection.getModels();
        this.elements.items.innerHTML = '';
        items.forEach(function(model) {
            var todoItemView = new app.TodoItemView({
                model: model
            });
            that.elements.items.appendChild(todoItemView.el);
        });
        
    };
    TodoView.prototype.submit = function(element, event) {
        var that = this,
            todoItem;
        event.preventDefault();
        todoItem = new app.TodoItemModel({
            title: this.elements.title.value
        });
        todoItem.save().then(function() {
            that.collection.fetch();
        });
        this.elements.title.value = '';
    };
    TodoView.prototype.keyup = function(element, event) {
        this.elements.counter.innerHTML = element.value.length || '';
    };
    app.TodoView = TodoView;
})(app, owl);
