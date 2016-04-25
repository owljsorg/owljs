(function(window, owl) {
    function Router(routes, defaultRoute, controller){
        var that = this;
        this.routes = [];
        this.defaultRoute = defaultRoute || ({
                callback: function() {
                    console.log('Default route is not defined');
                }
            });
        this.controller = controller;

        if (routes instanceof Array) {
            routes.forEach(function(route) {
                that.addRoute(route);
            });
        }
    }
    Router.prototype = {
        /**
         * Opens page by path
         * @param path
         */
        open: function(path) {
            var route = this.getRoute(path);

            if (!route) {
                return;
            }

            if (this.resolve(route)) {
                this.run(path, route);
            }
        },
        /**
         * Calls resolve callback
         * @param route
         * @returns {boolean}
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
            return true
        },
        /**
         * Runs the route
         * @param path
         * @param route
         */
        run: function(path, route) {
            var match,
                controller,
                controllerName,
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

            if (route.action && (route.controller || this.controller)) {
                controllerName = route.controller || this.controller;
                controller = owl.require(controllerName);
                if(controller[route.action]) {
                    controller[route.action](params);
                } else {
                    console.info('Action ' + route.action + ' is missing');
                }
            } else if(route.callback) {
                route.callback(params);
            } else {
                console.error('Either controller.action and collback are missing');
            }
        },
        /**
         * Adds a route
         * @param route
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
         * @param path
         * @returns {Object}
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
         * @param route
         */
        setDefaultRoute: function(route) {
            this.defaultRoute = route;
        },
        /**
         * Gets default route
         * @returns {Function}
         */
        getDefaultRoute: function() {
            return this.defaultRoute;
        },
        /**
         * Sets controller
         * @param controller
         */
        setController: function(controller) {
            this.controller = controller;
        },
        /**
         * Gets default controller
         * @returns {*}
         */
        getController: function() {
            return this.controller;
        }
    };
    owl.Router = Router;
})(window, owl);
