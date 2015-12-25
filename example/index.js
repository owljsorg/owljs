document.addEventListener('DOMContentLoaded', function() {
    var app = owl.require('app'),
        router = owl.require('router');
    router.setRoute({
        path: '*',
        callback: function() {
            console.log('404 page');
        }
    });
    router.setRoute({
        path: 'user',
        callback: function() {
            console.log('user');
        }
    });
    app.init({
        path: 'owl/example/'
    });
});