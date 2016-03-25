(function(app, owl) {
    function TestView() {
        owl.View.call(this, {
            className: 'something',
            template: function(data) {
                return '<div data-elements="test">' + data.something + '</div>';
            }
        });
        this.render();
    }
    TestView.prototype = Object.create(owl.View.prototype);
    TestView.prototype.render = function() {
        var that = this;
        this.el.innerHTML = this.template({
            something: 'Something!'
        });
        setTimeout(function() {
            that.el.innerHTML = that.template({
                something: 'Something else!'
            });
        }, 1000);
        this.findElements(this.el);
    };
    app.TestView = TestView;
})(app, owl);