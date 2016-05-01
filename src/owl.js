(function(window) {
    var callbacks = {},
        modules = {};

    /**
     * owl
     */
    window.owl = {
        /**
         * Requires a module
         * @param {string} name
         * @return {object}
         */
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
        /**
         * Defines a module
         * @param {string} name
         * @param {function} callback
         */
        define: function(name, callback) {
            callbacks[name] = callback;
        }
    };
})(window);