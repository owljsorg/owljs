module app {
    import Router = owl.Router;
    export class MainRouter extends Router{
        constructor() {
            var routes: Array<owl.Route> = [{
                    path: '',
                    action: 'readAll'
                }, {
                    path: 'item/:id',
                    callback: function () {
                        console.log('user');
                    }
                }],
                defaultRoute: owl.Route = {
                    callback: function () {
                        console.log('404 page');
                    }
                };
            super(routes, defaultRoute, 'todoController');
        }
    }
}