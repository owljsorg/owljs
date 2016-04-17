(function(app, owl) {
    function MainRouter() {
        var routes = [{
                path: '',
                action: 'readAll'
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
        owl.Router.call(this, routes, defaultRoute, 'todoController');
    }
    MainRouter.prototype = Object.create(owl.Router.prototype);
    owl.MainRouter = MainRouter;
})(app, owl);