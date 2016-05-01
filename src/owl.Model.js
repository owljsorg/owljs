(function(window, owl) {
    function Model(data, options){
        this.data = data || {};
        this.urlRoot = options && options.urlRoot || '';
        this.idAttribute = options && options.idAttribute || 'id';
        this.defaults = options && options.defaults || {};
        this.collection = options && options.collection || null;
        this.events = {};
    }
    Model.prototype = {
        /**
         * Gets attribute by name
         * @param {string} name Attribute name
         * @return {array}
         */
        get: function(name) {
            return this.data[name] || this.defaults[name];
        },
        /**
         * Sets attribute value by name
         * @param {string} name Attribute name
         * @param {any} value Attribute value
         */
        set: function(name, value) {
            this.data[name] = value;
            this.trigger('change', name);
        },
        /**
         * Gets data from the sever
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        fetch: function(query) {
            var that = this,
                url = this.urlRoot;
            if (this.data[this.idAttribute]) {
                url += '/' + this.data[this.idAttribute];
            }
            url +=  owl.ajax.toQueryString(query);
            return owl.ajax.request({
                url: url,
                type: 'GET'
            })
            .then(function(result) {
                that.data = result;
                that.trigger('change', Object.keys(that.data));
                return result;
            });
        },
        /**
         * Removes all attributes from the model
         */
        clear: function() {
            this.data = {};
        },
        /**
         * Save a model to database
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        save: function(query) {
            var that = this;
            var url  = this.urlRoot;
            var id = this.data[this.idAttribute];
            if(id) {
                url += '/' + this.data[this.idAttribute];
            }
            return owl.ajax.request({
                url: url + owl.ajax.toQueryString(query),
                type: id ? 'PUT' : 'POST',
                data: this.data
            })
            .then(function(result) {
                if(result[that.idAttribute]) {
                    that.data[that.idAttribute] = result[that.idAttribute];
                }
                that.trigger('change', [that.idAttribute]);
                return result;
            });
        },
        /**
         * Updates local data and saves model
         * @param {object} data Data to update
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        update: function(data, query) {
            var that = this,
                id = this.data[this.idAttribute];
            if(!id) {
                return new Promise(function(resolve, reject) {
                    reject('Can not update model without id');
                });
            }
            this.data = owl.util.extend(this.data, data, true);
            return this
            .save(query)
            .then(function(result) {
                that.trigger('change', Object.keys(data));
                return result;
            });
        },
        /**
         * Partially updates model
         * @param {object} data Data to patch
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        patch: function(data, query) {
            var that = this,
                id = this.data[this.idAttribute],
                url  = this.urlRoot + '/' + id;
            if (!id) {
                return new Promise(function(resolve, reject) {
                    reject('Can not patch model without id');
                });
            }

            this.data = owl.util.extend(this.data, data, true);
            return owl.ajax.request({
                url: url + owl.ajax.toQueryString(query),
                type: 'PATCH',
                data: data
            })
            .then(function(result) {
                that.trigger('change', Object.keys(data));
                return result;
            });
        },
        /**
         * Remove a model
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        destroy: function(query) {
            var that = this,
                id = this.data[this.idAttribute];
            if (!id) {
                return new Promise(function(resolve, reject) {
                    reject('Can not destroy model without id');
                });
            }
            return owl.ajax.request({
                url: this.urlRoot + '/' + id + owl.ajax.toQueryString(query),
                type: 'DELETE'
            })
            .then(function(result) {
                that.clear();
                return result;
            });
        },
        /**
         * Gets models data
         * @return {object} Model data
         */
        getData: function() {
            return this.data;
        },
        /**
         * Gets model collection
         * @return {owl.Collection} Model collection
         */
        getCollection: function() {
            return this.collection;
        },
        /**
         * Adds event listener
         * @param {string} event Event name
         * @param {function} listener Event listener
         */
        on: function(event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param {string} event Event name
         * @param {function} listener Event listener
         */
        off: function(event, listener) {
            if (this.events[event]) {
                this.events[event] = this.events[event].filter(function(currentListener) {
                    return currentListener !== listener;
                });
            }
        },
        /**
         * Trigger single event
         * @param {string} event Event name
         */
        triggerSingle: function(event) {
            var listeners = this.events[event];
            if(this.collection) {
                this.collection.trigger(event);
            }
            if (listeners) {
                listeners.forEach(function(listener) {
                    listener();
                });
            }
        },
        /**
         * Triggers events
         * @param {string} event Event name
         * @param {array} subEvents Sub events array
         */
        trigger: function(event, subEvents) {
            var that = this;
            this.triggerSingle(event);
            if(subEvents && subEvents instanceof Array) {
                subEvents.forEach(function(subEvent) {
                    that.triggerSingle(event + ':' + subEvent);
                });
            } else if (subEvents) {
                this.triggerSingle(event + ':' + subEvents);
            }
        }
    };
    owl.Model = Model;
})(window, owl);