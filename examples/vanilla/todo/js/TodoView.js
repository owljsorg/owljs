(function(app, owl) {
    function TodoView() {
        owl.View.call(this, {
            className: 'v-todo',
            // you can use any templating engine here
            template: function(data) {
                return (
                    '<form>' +
                        '<input data-element="input" />' +
                        '<input type="submit" value="Add" />' +
                    '</form>' +
                    '<div data-element="items"></div>'
                );
            },
            events: {
                'click $button': 'click',
                'keyup $input': 'keyup',
                'submit form': 'submit'
            }
        });
        // update links to data-element
        // and update special events (submit, focus, blur)
        this.render();
    }
    TodoView.prototype = Object.create(owl.View.prototype);
    TodoView.prototype.render = function() {
        this.el.innerHTML = this.template();
        this.update();
    };
    TodoView.prototype.submit = function(element, event) {

        event.preventDefault();


    };
    TodoView.prototype.keyup = function(element, event) {
        console.log(element.value.length);
    };
    app.TodoView = TodoView;
})(app, owl);
