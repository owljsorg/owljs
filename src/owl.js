(function(window) {
    var callbacks = {},
        modules = {},
        routers = [],
        resolves = {};

    function require(name) {
        if (!modules[name] && callbacks[name]) {
            modules[name] = callbacks[name]();
        }
        if (modules[name]) {
            return modules[name];
        } else {
            throw new Error('Module ' + name + ' is not found');
        }
    }

    function define(name, callback) {
        callbacks[name] = callback;
    }

    function addRouter(routerName, routerObject) {
        routers[routerName] = routerObject;
    }

    function removeRouter(routerName) {
        delete routers[routerName];
    }

    function addResolve(resolveName, resolveObject) {
        resolves[resolveName] = resolveObject;
    }

    function removeResolve(resolveName) {
        delete resolves[resolveName];
    }

    window.owl = {
        require: require,
        define: define,
        addRouter: addRouter,
        removeRouter: removeRouter,
        addResolve: addResolve,
        removeResolve: removeResolve
    };
})(window);