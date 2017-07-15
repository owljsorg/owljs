import owl from "../../../../typescript/owl";

module app {
    export class MainRouter extends owl.Router{
        constructor() {
            var routes: Array<owl.IRoute> = [{
                    path: '',
                    controller: app.TodoController
                }, {
                    path: 'item/:id',
                    callback: function () {
                        console.log('user');
                    }
                }],
                defaultRoute: owl.IRoute = {
                    callback: function () {
                        console.log('404 page');
                    }
                };
            super(routes, defaultRoute);
        }
    }
}