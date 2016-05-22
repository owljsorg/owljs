document.addEventListener('DOMContentLoaded', function() {
    require(['owl', 'MainRouter'], function (owl, MainRouter) {
        owl.history.init({
            baseUrl: '/requirejs/todo/'
        });
        owl.history.setDefaultRouter(new MainRouter());
        owl.history.start();
    });
});