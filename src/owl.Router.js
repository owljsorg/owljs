(function(window, owl) {
    /**
     * owl.Router
     * @param {array} routes List of routers
     * @param {object} defaultRoute Default route
     * @param {string} controller The name of the related controller
     * @constructor
     */
    function Router(routes, defaultRoute, controller){
        var that = this;
        this.routes = [];
        this.defaultRoute = defaultRoute || ({
                callback: function() {
                    console.log('Default route is not defined');
                }
            });
        this.controller = controller || null;

        if (routes instanceof Array) {
            routes.forEach(function(route) {
                that.addRoute(route);
            });
        }
    }
    Router.prototype = {
        /**
         * Opens page by path
         * @param {string} path Page path
         * @return {function} Function to destroy controller
         */
        open: function(path) {
            var route = this.getRoute(path);
            if (!route) {
                return;
            }

            if (this.resolve(route)) {
                return this.run(path, route);
            }
            return null;
        },
        /**
         * Calls resolve callback
         * @private
         * @param {object} route Route to resolve
         * @return {boolean}
         */
        resolve: function(route) {
            var resolves = route.resolves;
            if (resolves && resolves.length) {
                return resolves.every(function(resolve) {
                    var callback = owl.history.getResolve(resolve);
                    if(callback) {
                        return callback();
                    } else {
                        console.info('Resolve' + resolve + 'is not found');
                        return true;
                    }
                });
            }
            return true;
        },
        /**
         * Runs the route
         * @private
         * @param {string} path Path to run
         * @param {object} route Route to run
         * @return {function} Function to destroy controller
         */
        run: function(path, route) {
            var match,
                controller,
                action,
                i,

                params = {};

            if (route.regexp) {
                match = path.match(route.regexp);
                if (match) {
                    for (i = 1; i < match.length; i++) {
                        params[route.params[i - 1]] = match[i];
                    }
                }
            }

            if (route.controller || this.controller && !route.callback) {
                controller = new (route.controller || this.controller)(params);
                action = route.action || 'init';
                if (action && controller[action]) {
                    controller[action](params);
                }
                if (controller.destroy) {
                    return controller.destroy.bind(controller);
                }
            } else if (route.callback) {
                route.callback(params);
            } else {
                console.error('Either controller and callback are missing');
            }
            return null;
        },
        /**
         * Adds a route
         * @param {object} route Route to add
         */
        addRoute: function(route) {
            var paramRegexp = /:[a-zA-Z0-9]*/g,
                pattern = route.path.replace(paramRegexp, '([^/]*)'),
                match = route.path.match(paramRegexp),
                params = {};
            if (match) {
                route.regexp = new RegExp('^' + pattern + '$');
                params = match.map(function(param) {
                    return param.substring(1);
                });
            }
            route.params = params;
            this.routes.push(route);
        },
        /**
         * Returns the route by path
         * @param {string} path Path
         * @return {object}
         */
        getRoute: function(path) {
            var that = this,
                route;
            this.routes.some(function(currentRoute) {
                var test = currentRoute.regexp ? currentRoute.regexp.test(path) : currentRoute.path === path;
                if(test) {
                    route = currentRoute;
                    return true;
                }
                return false;
            });
            if (route) {
                return route;
            } else {
                return this.defaultRoute;
            }
        },
        /**
         * Sets default route
         * @param {object} route Route
         */
        setDefaultRoute: function(route) {
            this.defaultRoute = route;
        },
        /**
         * Gets default route
         * @return {object}
         */
        getDefaultRoute: function() {
            return this.defaultRoute;
        },
        /**
         * Sets controller
         * @param {Object} controller Related controller
         */
        setController: function(controller) {
            this.controller = controller;
        },
        /**
         * Gets controller
         * @return {string} Related controller
         */
        getController: function() {
            return this.controller;
        }
    };
    owl.Router = Router;
})(window, owl);
