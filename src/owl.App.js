(function(window, owl) {
    function App(){
    }
    App.prototype.init = function(options) {
        this.options = options || {};
    };
    App.prototype.getOptions = function() {
        return this.options;
    };
    App.prototype.getOption = function(name) {
        return this.options[name];
    };
    owl.App = App;
})(window, owl);