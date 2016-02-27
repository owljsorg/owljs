document.addEventListener('DOMContentLoaded', function() {
    var router = new owl.Router();
    router.setRoute({
        path: 'user',
        callback: function() {
            console.log('user');
        }
    });
    router.setRoute({
        path: 'user/:id',
        callback: function(params) {
            console.log('user', params);
        }
    });
    router.setDefaultRoute({
        callback: function() {
            console.log('404 page');
        }
    });

    owl.history.init({
        baseUrl: '/owl/example/'
    });
    owl.history.setDefaultRouter(router);
    owl.history.addRouter('main', router);
    owl.history.start();
    owl.history.navigate('user/111');

    var appView = new app.AppView();

});