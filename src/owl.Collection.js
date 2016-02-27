(function(window, owl) {
    function Collection(){
        this.url = '';
        this.collection = [];
    }
    /**
     * Gets data from server
     * @param query
     */
    Collection.prototype.fetch = function(query) {
        return owl.ajax({
            url: this.url + owl.ajax.toQueryString(query),
            type: 'GET'
        });
    };
    /**
     * Removes models from collection
     */
    Collection.prototype.clear = function() {
        this.collection = [];
    };
    /**
     * Get collection
     * @return
     */
    Collection.prototype.getJson = function() {
        return this.collection;
    };
    owl.Collection = Collection;
})(window, owl);