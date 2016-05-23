document.addEventListener('DOMContentLoaded', function() {
    var owl = require('owl.js'),
        mainRouter = require('./mainRouter');

    owl.history.init({
        baseUrl: '/webpack/todo/'
    });
    owl.history.setDefaultRouter(mainRouter);
    owl.history.start();
});