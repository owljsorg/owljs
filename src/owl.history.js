(function(window, owl) {
    var _options,
        _defaultOptions = {
            baseUrl: '/'
        },
        _defaultRouter = null,
        _listener,
        _routers = {},
        _resolves = {},
        _events = {},
        _started = false;

    owl.history = {
        init: function(options) {
            _options = owl.util.extend(_defaultOptions, options);
        },
        getOption: function(name) {
            return _options[name];
        },
        start: function() {
            var that = this;
            this.open(this.getLocation());
            _listener = window.addEventListener('popstate', function() {
                that.open(that.getLocation());
            }, false);
            _started = true;
        },
        isStarted: function() {
            return _started;
        },
        stop: function() {
            window.removeEventListener('popstate', _listener);
        },
        navigate: function(path) {
            window.history.pushState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        replace: function(path) {
            window.history.replaceState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        getLocation: function () {
            return window.location.pathname.replace(_options.baseUrl, '');
        },
        getHash: function() {
            return window.location.hash.substr(1);
        },
        setHash: function(hash) {
            window.location.hash = hash;
        },
        open: function(path) {
            var router;
            Object.keys(_routers).forEach(function(routerPath) {
                if(path.indexOf(routerPath) === 0) {
                    router = _routers[routerPath];
                    path = path.replace(routerPath, '');
                    return true;
                }
                return false;
            });
            if (!router) {
                router = _defaultRouter;
            }
            this.trigger('change');
            if (!router) {
                console.log('Default router is not defined');
                return;
            }
            router.open(path);
        },
        addRouter: function(path, router) {
            _routers[path] = router;
        },
        removeRouter: function(path) {
            delete _routers[path];
        },
        setDefaultRouter: function(router) {
            _defaultRouter = router;
        },
        resetDefaultRouter: function() {
            _defaultRouter = null;
        },
        addResolve: function(resolveName, resolveCallback) {
            _resolves[resolveName] = resolveCallback;
        },
        removeResolve: function(resolveName) {
            delete _resolves[resolveName];
        },
        getResolve: function(resolveName) {
            return _resolves[resolveName];
        },
        on: function(event, listener) {
            if(!_events[event]) {
                _events[event] = [];
            }
            _events[event].push(listener);
        },
        trigger: function(event) {
            _events[event] && _events[event].forEach(function(listener) {
                listener();
            });
        }
    };
})(window, owl);