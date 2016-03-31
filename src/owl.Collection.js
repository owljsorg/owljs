(function(window, owl) {
    function Collection(){
        this.url = '';
        this.data = [];
    }
    /**
     * Gets data from server
     * @param query
     */
    Collection.prototype.fetch = function(query) {
        var that = this;
        return owl.ajax({
            url: this.url + owl.ajax.toQueryString(query),
            type: 'GET'
        })
        .then(function(result) {
            that.data = result;
            return result;
        });
    };
    /**
     * Removes models from collection
     */
    Collection.prototype.clear = function() {
        this.data = [];
    };
    /**
     * Get collection
     * @return
     */
    Collection.prototype.getData = function() {
        return this.data;
    };
    owl.Collection = Collection;
})(window, owl);