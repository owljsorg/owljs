(function(window, owl) {
    function Collection(){
        this.url = '';
        this.collection = [];
    }
    /**
     * Gets data from server
     * @param query
     */
    Model.prototype.fetch = function(query) {
        return owl.ajax({
            url: this.url + owl.ajax.toQueryString(query),
            type: 'GET'
        });
    };
    /**
     * Removes models from collection
     */
    Model.prototype.clear = function() {
        this.collection = [];
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