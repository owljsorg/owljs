(function(window) {
    var callbacks = {},
        modules = {};
    window.owl = {
        require: function(name) {
            if (!modules[name] && callbacks[name]) {
                modules[name] = callbacks[name]();
            }
            if (modules[name]) {
                return modules[name];
            } else {
                throw new Error('Module ' + name + ' is not found');
            }
        },
        define: function(name, callback) {
            callbacks[name] = callback;
        }
    };
})(window);