document.addEventListener('DOMContentLoaded', function() {
    owl.define('appView', function() {
        return new app.AppView();
    });

    owl.history.init({
        baseUrl: '/babel/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});