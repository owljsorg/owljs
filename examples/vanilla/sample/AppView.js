(function(app) {
    function AppView() {
        owl.View.call(this, {
            el: document.querySelector('html'),
            events: {
                'click $button': 'click',
                'keyup $input': 'keyup'
            }
        });
        this.findElements(this.el);
    }
    AppView.prototype = Object.create(owl.View.prototype);
    AppView.prototype.click = function(event) {
        var test;
        event.preventDefault();
        test = new app.TestView();
        this.elements.subs.appendChild(test.el);
    };
    AppView.prototype.keyup = function(event) {
        console.log(event);
    };
    app.AppView = AppView;
})(app);