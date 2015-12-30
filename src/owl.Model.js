(function(window, owl) {
    function Model(){

    }
    Model.prototype.url = '';
    Model.prototype.idAttribute = 'id';
    Model.prototype.attributes = {};
    Model.prototype.changed = false;
    Model.prototype.fetch = function(data) {

    };
    Model.prototype.get = function(name) {

    };
    Model.prototype.set = function(name, value) {

    };
    /**
     * Gets data from the sever
     * @param data
     */
    Model.prototype.fetch = function(data) {

    };
    /**
     * Removes all attributes from the model
     * @param data
     */
    Model.prototype.clear = function(data) {

    };
    /**
     * Save a model to database
     * @param options
     */
    Model.prototype.save = function(options) {

    };
    /**
     * Remove a model
     * @param options
     */
    Model.prototype.destroy = function(options) {

    };
    /**
     *
     * @param options
     */
    Model.prototype.validate = function(options) {

    };
    Model.prototype.getJson = function() {
        return this.attributes;
    };
    owl.Model = Model;
})(window, owl);