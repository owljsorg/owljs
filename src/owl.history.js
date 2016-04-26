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
        /**
         * Init the history
         * @param options
         */
        init: function(options) {
            _options = owl.util.extend(_defaultOptions, options, true);
        },
        /**
         * Gets an option
         * @param name
         * @return {any}
         */
        getOption: function(name) {
            return _options[name];
        },
        /**
         * Starts watching popstate event
         */
        start: function() {
            var that = this;
            this.open(this.getLocation());
            _listener = window.addEventListener('popstate', function() {
                that.open(that.getLocation());
            }, false);
            _started = true;
        },
        /**
         * Checks is history started
         * @returns {boolean}
         */
        isStarted: function() {
            return _started;
        },
        /**
         * Stop watching popstate event
         * @returns {boolean}
         */
        stop: function() {
            window.removeEventListener('popstate', _listener);
        },
        /**
         * Adds new item to the navigation history
         * @param path
         */
        navigate: function(path) {
            window.history.pushState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        /**
         * Replaces current item in the navigation history
         * @param path
         */
        replace: function(path) {
            window.history.replaceState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        /**
         * Gets current location
         * @return {string}
         */
        getLocation: function () {
            return window.location.pathname.replace(_options.baseUrl, '').replace(/\/$/, '');
        },
        /**
         * Gets current hash
         * @return {string}
         */
        getHash: function() {
            return window.location.hash.substr(1);
        },
        /**
         * Sets hash
         * @param hash
         */
        setHash: function(hash) {
            window.location.hash = hash;
        },
        /**
         * Opens the page by path
         * @param path
         */
        open: function(path) {
            var router;
            Object.keys(_routers).some(function(routerPath) {
                if(path === routerPath ||
                    (path.indexOf(routerPath) === 0 && path.length > routerPath.length && path[routerPath.length] === '/')) {
                    router = _routers[routerPath];
                    path = path.replace(routerPath, '');
                    return true;
                }
                return false;
            });
            if (!router) {
                router = _defaultRouter;
            }
            if (!router) {
                console.log('Default router is not defined');
                return;
            }
            this.trigger('change');
            router.open(path);
        },
        /**
         * Sets router by name
         * @param name
         * @param router
         */
        setRouter: function(path, router) {
            _routers[path] = router;
        },
        /**
         * Removes router by name
         * @param name
         */
        removeRouter: function(path) {
            delete _routers[path];
        },
        /**
         * Gets router by name
         * @param name
         * @return {owl.Router}
         */
        getRouter: function(path) {
            return _routers[path];
        },
        /**
         * Sets default router
         * @param router
         */
        setDefaultRouter: function(router) {
            _defaultRouter = router;
        },
        /**
         * Gets default router
         */
        getDefaultRouter: function() {
            return _defaultRouter;
        },
        /**
         * Sets resolve
         * @param resolveName
         * @param resolveCallback
         */
        setResolve: function(resolveName, resolveCallback) {
            _resolves[resolveName] = resolveCallback;
        },
        /**
         * Removes resolve by name
         * @param resolveName
         */
        removeResolve: function(resolveName) {
            delete _resolves[resolveName];
        },
        /**
         * Gets resolve by name
         * @param resolveName
         */
        getResolve: function(resolveName) {
            return _resolves[resolveName];
        },
        /**
         * Adds event listener
         * @param event
         * @param listener
         */
        on: function(event, listener) {
            if (!_events[event]) {
                _events[event] = [];
            }
            _events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param event
         * @param listener
         */
        off: function(event, listener) {
            if (_events[event]) {
                var listenerIndex = -1;
                _events[event].forEach(function(func, index) {
                    if(func === listener) {
                        listenerIndex = index;
                    }
                });
                _events[event].splice(listenerIndex, 1);
            }
        },
        /**
         * Trigger event
         * @param event
         */
        trigger: function(event) {
            _events[event] && _events[event].forEach(function(listener) {
                listener();
            });
        }
    };
})(window, owl);
