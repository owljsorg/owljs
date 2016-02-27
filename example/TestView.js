(function(app) {
    function TestView() {
        owl.View.call(this, {
            className: 'something',
            template: function(data) {
                return '<div>' + data.something + '</div>';
            }
        });
        this.render();
    }
    TestView.prototype = Object.create(owl.View.prototype);
    TestView.prototype.render = function() {
        this.el.innerHTML = this.template({
            something: 'Something!'
        });
    };
    app.TestView = TestView;
})(app);