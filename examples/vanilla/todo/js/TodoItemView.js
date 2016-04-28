(function(app, owl) {
    function TodoItemView(options) {
        owl.View.call(this, {
            className: 'v-todo',
            // you can use any templating engine here
            template: function(data) {
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
            model: options.model
        });
        // update links to data-element
        // and update special events (submit, focus, blur)
        this.render();
        this.initListeners();
    }
    TodoItemView.prototype = Object.create(owl.View.prototype);
    TodoItemView.prototype.render = function() {
        this.el.innerHTML = this.template(this.model.getData());
        this.update();
    };
    TodoItemView.prototype.change = function(element, event) {
        event.preventDefault();
        this.model.patch({
            isDone: element.checked
        });
    };
    TodoItemView.prototype.initListeners = function() {
        var that = this;
        this.model.on('change', function() {
            that.render();
        });
    };
    app.TodoItemView = TodoItemView;
})(app, owl);
