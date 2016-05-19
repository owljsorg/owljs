console.log('ok');
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