///<reference path="../../../../typescript/owl.d.ts"/>
///<reference path="AppView.ts"/>
///<reference path="MainRouter.ts"/>
///<reference path="TodoController.ts"/>

document.addEventListener('DOMContentLoaded', function() {
    owl.define('appView', function() {
        return new app.AppView();
    });
    owl.define('todoController', function() {
        return new app.TodoController()
    });

    owl.history.init({
        baseUrl: '/vanilla/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});