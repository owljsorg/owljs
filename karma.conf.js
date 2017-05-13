module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            'bower_components/bluebird/js/browser/bluebird.js',
            'src/owl.js',
            'src/owl.Promise.js',
            'src/owl.AjaxError.js',
            'src/owl.util.js',
            'src/owl.history.js',
            'src/owl.ajax.js',
            'src/owl.EventEmitter.js',
            'src/owl.Collection.js',
            'src/owl.Controller.js',
            'src/owl.Model.js',
            'src/owl.Router.js',
            'src/owl.View.js',
            'test/*'
        ],
        browsers: ['PhantomJS'],
        reporters: ['mocha', 'coverage', 'coveralls'],
        preprocessors: {
            'src/**/*.js': ['coverage', 'coveralls']
        },
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage/'
        }
    });
};
