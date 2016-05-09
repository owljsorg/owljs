(function(app, owl) {
    function TodoView(options) {
        owl.View.call(this, {
            className: 'v-todo',
            // you can use any templating engine here
            template: function(data) {
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
            collection: options.collection
        });
        this.templateCount = function(data) {
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
    TodoView.prototype = Object.create(owl.View.prototype);
    TodoView.prototype.render = function() {
        this.el.innerHTML = this.template();
        this.update();
        this.renderItems();
        this.renderCount();
    };
    TodoView.prototype.renderItems = function() {
        var that = this,
            items = this.collection.getModels();
        this.elements.items.innerHTML = '';
        items.forEach(function(model) {
            var todoItemView = new app.TodoItemView({
                model: model
            });
            that.elements.items.appendChild(todoItemView.getEl());
        });
    };
    TodoView.prototype.renderCount = function() {
        var countLeft = 0;
        this.collection.getModels().forEach(function(model) {
            if(!model.get('isDone')) {
                countLeft++;
            }
        });
        this.elements.count.innerHTML = this.templateCount({
            countLeft: countLeft
        });
    };
    TodoView.prototype.initListeners = function() {
        var that = this;
        this.collection.on('change', function() {
            that.renderItems();
            that.renderCount();
        });
    };
    TodoView.prototype.submit = function(element, event) {
        var that = this,
            todoItem;
        event.preventDefault();
        todoItem = new app.TodoItemModel({
            title: this.elements.title.value,
            isDone: false
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
