(function(window, owl) {
    /**
     * owl.Controller
     * @constructor
     */
    function Controller() {

    }

    /**
     * Init a controller
     * Will be called after navigate to new page
     * If action is defined in route it will be called instead of init
     */
    Controller.prototype.init = function() {

    };

    /**
     * Removes all data created by controller
     * Will be called before navigate to new page
     */
    Controller.prototype.destroy = function() {

    };

    owl.Controller = Controller;
})(window, owl);