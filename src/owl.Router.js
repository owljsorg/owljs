(function(owl) {
    function Router(){
        this.routes = {};
    }
    Router.prototype.add = function(path, resolves, callback) {
        var params = path.split('/'),
            currentRoute = this.routes;
        params.forEach(function(param) {
            if (!currentRoute[param]) {
                currentRoute[param] = {};
            }
            currentRoute = currentRoute[param];
        });
        currentRoute['$'] = {
            path: path,
            resolves: resolves,
            callback: callback
        };
    };
    Router.prototype.route = function(path) {
        var params = path.split('/'),
            currentRoute = this.routes;
        params.forEach(function(param) {
            if (!currentRoute) {
                return false;
            }
            currentRoute = currentRoute[param];
        });
        return currentRoute.$;
    };
    owl.Router = Router;
})(owl);