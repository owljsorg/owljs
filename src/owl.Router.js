(function(window, owl) {
    function Router(){
        this.routes = [];
        this.defaultRoute = {
            callback: function() {
                console.log('Default route is not defined');
            }
        }
    }
    Router.prototype.open = function(path) {
        var route = this.getRoute(path),
            match,
            i,
            params = {};
        if(route && route.regexp) {
            match = path.match(route.regexp);
            if (match) {
                for(i = 1; i < match.length; i++) {
                    params[route.params[i - 1]] = match[i];
                }
            }
        }
        route.callback(params);
    };
    Router.prototype.setRoute = function(route) {
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