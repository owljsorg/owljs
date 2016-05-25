define('MainRouter', ['owl', 'TodoController'], function(owl, TodoController) {
    function MainRouter() {
        var routes = [{
                path: '',
                controller: TodoController,
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
    return MainRouter;
});
