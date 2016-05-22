(function(app, owl) {
    class MainRouter extends owl.Router {
        constructor() {
            var todoController = owl.require('todoController'),
                routes = [{
                    path: '',
                    action: 'readAll'
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
            super(routes, defaultRoute, todoController);
        }
    }
    app.MainRouter = MainRouter;
})(app, owl);