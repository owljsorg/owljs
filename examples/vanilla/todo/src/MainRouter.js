(function(app, owl) {
    function MainRouter() {
        var routes = [{
                path: '',
                controller: app.TodoController
            }, {
                path: 'item/:id',
                callback: function() {
                    console.log('user');
                }
            }],
            defaultRoute = {
                callback: function() {
                    console.log('404 page');
                }
            };
        owl.Router.call(this, routes, defaultRoute);
    }
    MainRouter.prototype = Object.create(owl.Router.prototype);
    app.MainRouter = MainRouter;
})(app, owl);