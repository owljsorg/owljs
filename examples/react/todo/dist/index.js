'use strict';

document.addEventListener('DOMContentLoaded', function () {
    owl.define('appView', function () {
        return new app.AppView();
    });
    owl.define('todoController', function () {
        return new app.TodoController();
    });

    owl.history.init({
        baseUrl: '/react/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});