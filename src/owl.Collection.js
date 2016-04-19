(function(window, owl) {
    function Collection(data, options){
        var that = this;
        this.url = options.url;
        this.model = options.model;
        this.data = [];
        this.models = [];
        this.length = 0;

        if(data) {
            this.setData(data);
        }
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
            var that = this;
            if (data instanceof Array) {
                this.data = data;
                this.length = data.length;
                this.models = data.map(function(item) {
                    return new that.model(item);
                });
            } else {
                this.data = [];
                this.models = [];
                this.length = 0;
            }
        },
        /**
         * Gets collection data
         * @return {Array<any>}
         */
        getData: function() {
            return this.data;
        },
        /**
         * Gets collection models
         * @return {Array<owl.Model>}
         */
        getModels: function() {
            return this.models;
        }
    };
    owl.Collection = Collection;
})(window, owl);