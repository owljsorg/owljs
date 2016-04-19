(function(app, owl) {
    function TodoItemView(options) {
        owl.View.call(this, {
            className: 'v-todo',
            // you can use any templating engine here
            template: function(data) {
                return (
                    '<div>' + data.title + '</div>'
                );
            },
            events: {

            },
            model: options.model
        });
        // update links to data-element
        // and update special events (submit, focus, blur)
        this.render();
    }
    TodoItemView.prototype = Object.create(owl.View.prototype);
    TodoItemView.prototype.render = function() {
        this.el.innerHTML = this.template(this.model.getData());
        this.update();
    };
    app.TodoItemView = TodoItemView;
})(app, owl);
