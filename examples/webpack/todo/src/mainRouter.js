var owl = require('owl.js'),
    TodoController = require('./TodoController');

function MainRouter() {
    var routes = [{
            path: '',
            controller: TodoController
        }, {
            path: 'item/:id',
            callback: function() {
                console.log('user');
            }
        }],
        defaultRoute = {
            callback: function() {
                console.log('404 page');
            }
        };
    owl.Router.call(this, routes, defaultRoute);
}
MainRouter.prototype = Object.create(owl.Router.prototype);

module.exports = new MainRouter();
