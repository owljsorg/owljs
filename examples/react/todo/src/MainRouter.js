(function(app, owl) {
    class MainRouter extends owl.Router {
        constructor() {
            var routes = [{
                    path: '',
                    controller: app.TodoController
                }, {
                    path: 'about',
                    controller: app.AboutController
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