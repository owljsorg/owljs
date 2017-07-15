///<reference path="AppView.ts"/>
///<reference path="MainRouter.ts"/>
///<reference path="TodoController.ts"/>
///<reference path="TodoItemModel.ts"/>
///<reference path="TodoItemCollection.ts"/>
///<reference path="TodoView.ts"/>
///<reference path="TodoItemView.ts"/>

import owl from "../../../../typescript/owl";

document.addEventListener('DOMContentLoaded', function() {
    owl.define('appView', function() {
        return new app.AppView();
    });

    owl.history.init({
        baseUrl: '/typescript/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});