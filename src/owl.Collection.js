(function(window, owl) {
    function Collection(options){
        this.url = options.url;
        this.model = options.model;
        this.data = [];
        this.length = 0;
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
                that.length = result.length;
                that.models = result.map(function(item) {
                    return new that.model(item);
                });
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