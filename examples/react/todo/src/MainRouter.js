(function(app, owl) {
    class MainRouter extends owl.Router {
        constructor() {
            var routes = [{
                    path: '',
                    controller: app.TodoController
                }, {
                    path: 'item/:id',
                    callback: function () {
                        console.log('user');
                    }
                }],
                defaultRoute = {
                    callback: function () {
                        console.log('404 page');
                    }
                };
            super(routes, defaultRoute);
        }
    }
    app.MainRouter = MainRouter;
})(app, owl);