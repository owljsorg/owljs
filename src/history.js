(function(window, owl) {
    var _options,
        _defaultOptions = {
            baseUrl: '',
            test: 'tests'
        },
        _listener;

    function init(options) {
        _options = owl.util.extend(_defaultOptions, options);
    }

    function start() {
        open(window.location.pathname);
        _listener = window.addEventListener('popstate', function() {
            open(window.location.pathname);
        }, false);
    }

    function stop() {
        window.removeEventListener('popstate', _listener);
    }

    function path(url) {
        window.history.pushState(null, null, _options.baseUrl + url);
        open(url);
    }

    function replace(url) {
        window.history.replaceState(null, null, _options.baseUrl + url);
        open(url);
    }

    function open(url) {

    }

    owl.history = {
        init: init,
        start: start,
        path: path,
        replace: replace
    };
}(window, window.owl));