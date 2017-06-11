(function(window, owl) {
    /**
     * owl.Collection
     * @param {array} data Collection data
     * @param {object} options Collection options
     * @constructor
     */
    function Collection(data, options){
        owl.EventEmitter.apply(this, [data, options]);

        this.url = options.url;

        this.model = options.model;
        this.data = [];
        this.models = [];
        this.totalCount = 0;

        this.setData(data);
    }
    Collection.prototype = Object.create(owl.EventEmitter.prototype);

    /**
     * Gets data from server
     * @param {object} query Query that will be passed with request
     */
    Collection.prototype.fetch = function(query) {
        var that = this;
        return owl.ajax.request({
            url: this.url + owl.ajax.toQueryString(query),
            type: 'GET'
        })
        .then(function(result) {
            that.setData(result.data);

            if (result.headers['X-Total-Count']) {
                that.setTotalCount(parseInt(result.headers['X-Total-Count'], 10));
            }

            return result.data;
        });
    };

    /**
     * Removes models from collection
     */
    Collection.prototype.clear = function() {
        this.data = [];
        this.models = [];
        this.length = 0;
        this.trigger('change');
    };

    /**
     * Sets collection data
     * @param {object} data Collection data
     */
    Collection.prototype.setData = function(data) {
        var that = this;
        if (data instanceof Array) {
            this.data = data;
            this.length = data.length;
            this.models = data.map(function(item, index) {
                return new that.model(item, {
                    collection: that,
                    collectionIndex: index
                });
            });
        } else {
            this.models = [];
            this.length = 0;
        }
        that.trigger('change');
    };
    /**
     * Gets collection data
     * @return {array} Collection data
     */
    Collection.prototype.getData = function() {
        return this.data;
    };

    /**
     * Sets total count of elements
     * @param {number} totalCount Total count of elements
     */
    Collection.prototype.setTotalCount = function(totalCount) {
        this.totalCount = totalCount;
    };

    /**
     * Gets total count of elements
     * @return {number} total count of elements
     */
    Collection.prototype.getTotalCount = function() {
        return this.totalCount;
    };

    /**
     * Gets collection models
     * @return {array} Collection models
     */
    Collection.prototype.getModels = function() {
        return this.models;
    };

    /**
     * Gets collection length
     * @return {number}
     */
    Collection.prototype.getLength = function() {
        return this.length;
    };

    /**
     * Gets a model by index
     */
    Collection.prototype.get = function(index) {
       return this.models[index];
    };

    /**
     * Updates collection data
     */
    Collection.prototype.update = function(index) {
        if (typeof index === 'number') {
            this.data[index] = this.models[index].getData();
        } else {
            this.data = this.models.map(function(model) {
                return model.getData();
            });
        }
    };
    owl.Collection = Collection;
})(window, owl);