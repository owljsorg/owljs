(function(window, owl) {
    function Collection(data, options){
        this.url = options.url;
        this.model = options.model;
        this.events = {};

        this.setData(data);
    }
    Collection.prototype = {
        /**
         * Gets data from server
         * @param {Object} query Query that will be passed with request
         */
        fetch: function(query) {
            var that = this;
            return owl.ajax({
                url: this.url + owl.ajax.toQueryString(query),
                type: 'GET'
            })
            .then(function(result) {
                that.setData(result);
                return result;
            });
        },
        /**
         * Removes models from collection
         */
        clear: function() {
            this.data = [];
            this.models = [];
            this.length = 0;
            this.trigger('change');
        },
        /**
         * Sets collection data
         * @param {Object} data Collection data
         */
        setData: function(data) {
            var that = this;
            if (data instanceof Array) {
                this.data = data;
                this.length = data.length;
                this.models = data.map(function(item) {
                    return new that.model(item, {
                        collection: that
                    });
                });
            } else {
                this.data = [];
                this.models = [];
                this.length = 0;
            }
            that.trigger('change');
        },
        /**
         * Gets collection data
         * @return {Array} Collection data
         */
        getData: function() {
            return this.data;
        },
        /**
         * Gets collection models
         * @return {Array} Collection models
         */
        getModels: function() {
            return this.models;
        },
        /**
         * Gets collection length
         * @return {Number}
         */
        getLength: function() {
            return this.length;
        },
        /**
         * Adds event listener
         * @param {String} event Event name
         * @param {Function} listener Event listener
         */
        on: function(event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param {String} event Event name
         * @param {Function} listener Event listener
         */
        off: function(event, listener) {
            if (this.events[event]) {
                this.events[event] = this.events[event].filter(function(currentListener) {
                    return currentListener !== listener;
                });
            }
        },
        /**
         * Triggers event
         * @param {String} event Event name
         */
        trigger: function(event) {
            var listeners = this.events[event];
            if (listeners) {
                listeners.forEach(function(listener) {
                    listener();
                });
            }
        }
    };
    owl.Collection = Collection;
})(window, owl);