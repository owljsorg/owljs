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
    Router.prototype.open = function(path) {
        var route = this.getRoute(path),
            match,
            i,
            controller,

            params = {};

        if (route && route.regexp) {
            match = path.match(route.regexp);
            if (match) {
                for (i = 1; i < match.length; i++) {
                    params[route.params[i - 1]] = match[i];
                }
            }
        }
        if (route.action && (route.controller || this.controller)) {
            controller = route.controller || this.controller;
            owl.require(controller)[route.action]();
        } else if(route.callback) {
            route.callback(params);
        } else {
            console.error('Either controller.action and collback are messing');
        }
    };
    Router.prototype.addRoute = function(route) {
        var paramRegexp = /\:[a-zA-Z0-9]*/g,
            pattern = route.path.replace(paramRegexp, '(.*)'),
            match = route.path.match(paramRegexp),
            params = [];
        route.regexp = new RegExp('^' + pattern + '$');
        if (match) {
            params = match.map(function(param) {
                return param.substring(1);
            });
        }
        route.params = params;
        this.routes.push(route);
    };
    Router.prototype.getRoute = function(path) {
        var that = this,
            route,
            params = {};
        this.routes.forEach(function(currentRoute) {
            var test = currentRoute.regexp.test(path);
            if(test) {
                route = currentRoute
            }
        });
        if (route) {
            return route;
        } else {
            return this.defaultRoute;
        }
    };
    Router.prototype.setDefaultRoute = function(route) {
        this.defaultRoute = route;
    };
    owl.Router = Router;
})(window, owl);