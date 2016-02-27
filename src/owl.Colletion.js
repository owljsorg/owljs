(function(window, owl) {
    function Collection(collection){

    }
    Collection.prototype.url = '';
    Collection.prototype.collection = [];
    Collection.prototype.fetch = function(data) {

    };
    /**
     * Removes models from collection
     */
    Model.prototype.clear = function() {

    };
    /**
     * Get collection
     * @return
     */
    Model.prototype.getJson = function() {
        return this.collection;
    };
    owl.Model = Model;
})(window, owl);