(function(window, owl) {
    var _options,
        _defaultOptions = {
            baseUrl: '/',
            test: 'tests'
        },
        _defaultRouter = null,
        _listener,
        _routers = [],
        _resolves = {};

    function init(options) {
        _options = owl.util.extend(_defaultOptions, options);
    }

    function start() {
        open(getLocation());
        _listener = window.addEventListener('popstate', function() {
            open(getLocation());
        }, false);
    }

    function stop() {
        window.removeEventListener('popstate', _listener);
    }

    function navigate(path) {
        window.history.pushState(null, null, _options.baseUrl + path);
        open(path);
    }

    function replace(path) {
        window.history.replaceState(null, null, _options.baseUrl + path);
        open(path);
    }

    function getLocation () {
        return window.location.pathname.replace(_options.baseUrl, '');
    }

    function getHash () {
        return window.location.hash.substr(1);
    }

    function setHash(hash) {
        window.location.hash = hash;
    }

    function open(path) {
        var router,
            route;
        Object.keys(_routers).find(function(routerPath) {
            if(path.indexOf(routerPath) === 0) {
                router = _routers[path];
                path = path.replace(routerPath, '');
                return true;
            }
            return false;
        });
        if (!router) {
            router = _defaultRouter;
        }
        router.open(path);
    }

    function addRouter(path, router) {
        _routers[path] = router;
    }

    function removeRouter(routerPath) {
        delete _routers[routerName];
    }

    function setDefaultRouter(router) {
        _defaultRouter = router;
    }

    function resetDefaultRouter() {
        _defaultRouter = null;
    }

    function addResolve(resolveName, resolveCallback) {
        _resolves[resolveName] = resolveCallback;
    }

    function removeResolve(resolveName) {
        delete _resolves[resolveName];
    }

    function getResolve(resolveName) {
        return _resolves[resolveName];
    }

    owl.history = {
        init: init,
        start: start,
        navigate: navigate,
        replace: replace,
        addRouter: addRouter,
        removeRouter: removeRouter,
        setDefaultRouter: setDefaultRouter,
        resetDefaultRouter: resetDefaultRouter,
        addResolve: addResolve,
        removeResolve: removeResolve,
        getResolve: getResolve
    };
}(window, window.owl));