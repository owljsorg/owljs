(function(app) {
    function AppView() {
        owl.View.call(this, {
            el: document.querySelector('html'),
            events: {
                'click button': 'click',
                'keyup input': 'keyup'
            }
        });
    }
    AppView.prototype = Object.create(owl.View.prototype);
    AppView.prototype.click = function(event) {
        var test;
        event.preventDefault();
        test = new app.TestView();
        this.el.appendChild(test.el);
    };
    app.AppView = AppView;
})(app);