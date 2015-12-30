(function(window, owl) {
    function Router(){
        this.routes = {
            $: {
                path: '*',
                callback: function() {
                    console.log('Default route is not defined');
                }
            }
        };
    }
    Router.prototype.init = function(options) {
        var that = this;
        this.options = options;

        window.addEventListener('popstate', function () {
            that.open(that.getLocation());
        });
        this.open(this.getLocation());
    };
    Router.prototype.getLocation = function () {
        return window.location.href.replace(/.*:\/\/[^\/]*\//, '').replace(this.options.path, '');
    };
    Router.prototype.getHash = function () {
        return window.location.hash.substr(1);
    };
    Router.prototype.setHash = function(hash) {
        window.location.hash = hash;
    };
    Router.prototype.open = function(path) {
        var route = this.getRoute(path);
        route.callback();
    };
    Router.prototype.setRoute = function(route) {
        var params = route.path.split('/'),
            currentRoute = this.routes;
        if (route.path !== '*') {
            params.forEach(function (param) {
                if (!currentRoute[param]) {
                    currentRoute[param] = {};
                }
                currentRoute = currentRoute[param];
            });
        }
        currentRoute.$ = route;
    };
    Router.prototype.getRoute = function(path) {
        var params = path.split('/'),
            currentRoute = this.routes;
        params.forEach(function(param) {
            if (!currentRoute) {
                return false;
            }
            currentRoute = currentRoute[param];
        });
        if (currentRoute) {
            return currentRoute.$;
        } else {
            return this.routes.$;
        }
    };
    Router.prototype.navigate = function(path) {
        window.history.pushState(null, null, path);
        this.open(path);
    };
    Router.prototype.replace = function(path) {
        window.history.replaceState(null, null, path);
        this.open(path);
    };
    owl.Router = Router;
})(window, owl);