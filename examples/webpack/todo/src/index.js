var owl = require('../../../../dist/owl-commonjs'),
    AppView = require('./AppView'),
    TodoController = require('./TodoController'),
    MainRouter = require('./MainRouter');

document.addEventListener('DOMContentLoaded', function() {
    owl.define('appView', function() {
        return new AppView();
    });
    owl.define('todoController', function() {
        return new TodoController()
    });

    owl.history.init({
        baseUrl: '/webpack/todo/'
    });
    owl.history.setDefaultRouter(new MainRouter());
    owl.history.start();
});