///<reference path="../../../../typescript/owl.d.ts"/>
///<reference path="AppView.ts"/>
///<reference path="MainRouter.ts"/>
///<reference path="TodoController.ts"/>
///<reference path="TodoItemModel.ts"/>
///<reference path="TodoItemCollection.ts"/>
///<reference path="TodoView.ts"/>
///<reference path="TodoItemView.ts"/>

document.addEventListener('DOMContentLoaded', function() {
    owl.define('appView', function() {
        return new app.AppView();
    });
    owl.define('todoController', function() {
        return new app.TodoController()
    });

    owl.history.init({
        baseUrl: '/typescript/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});