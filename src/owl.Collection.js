(function(window, owl) {
    function Collection(data, options){
        this.url = options.url;
        this.model = options.model;
        this.data = options.data || [];
        this.length = 0;
    }
    Collection.prototype = {
        /**
         * Gets data from server
         * @param query
         */
        fetch: function(query) {
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
        },
        /**
         * Removes models from collection
         */
        clear: function() {
            this.data = [];
        },
        /**
         * Sets collection data
         * @param data
         */
        setData: function(data) {
            this.data = data;
        },
        /**
         * Gets collection data
         * @return {Array}
         */
        getData: function() {
            return this.data;
        }
    };
    owl.Collection = Collection;
})(window, owl);