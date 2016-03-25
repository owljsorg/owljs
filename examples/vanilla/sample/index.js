document.addEventListener('DOMContentLoaded', function() {
    var routes = [{
        path: '',
        callback: function() {
            console.log('main');
        }
    }, {
        path: 'user',
        callback: function() {
            console.log('user');
        }
    }, {
        path: 'user/:id',
        callback: function(params) {
            console.log('user', params);
        }
    }];
    var defaultRoute = {
        callback: function() {
            console.log('404 page');
        }
    };
    var router = new owl.Router(routes, defaultRoute);

    owl.history.init({
        baseUrl: '/vanilla/sample/'
    });
    owl.history.setDefaultRouter(router);
    owl.history.addRouter('main', router);
    owl.history.start();
    //owl.history.navigate('user/111/');

    var thingModel = new app.ThingModel({
        id: 123
    });
    thingModel.fetch().then(function(data) {
        console.log(data);
    });
    var appView = new app.AppView();

});