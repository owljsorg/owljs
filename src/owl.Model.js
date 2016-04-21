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
         * @param name
         * @returns {Array}
         */
        get: function(name) {
            return this.data[name] || this.defaults[name];
        },
        /**
         * Sets attribute value by name
         * @param name
         * @param value
         */
        set: function(name, value) {
            this.data[name] = value;
            this.trigger('change', name);
        },
        /**
         * Gets data from the sever
         * @param query
         * @return Promise
         */
        fetch: function(query) {
            var that = this,
                url = this.urlRoot;
            if (this.data[this.idAttribute]) {
                url += '/' + this.data[this.idAttribute];
            }
            url +=  owl.ajax.toQueryString(query);
            return owl.ajax({
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
         * @param query
         * @return Promise
         */
        save: function(query) {
            var that = this;
            var url  = this.urlRoot;
            var id = this.data[this.idAttribute];
            if(id) {
                url += '/' + this.data[this.idAttribute];
            }
            return owl.ajax({
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
         * @param data
         * @param query
         * @return Promise
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
         * @param data
         * @param query
         * @return Promise
         */
        patch: function(data, query) {
            var that = this,
                id = this.data[this.idAttribute],
                url  = this.urlRoot + '/' + id;
            if(!id) {
                return new Promise(function(resolve, reject) {
                    reject('Can not patch model without id');
                });
            }

            this.data = owl.util.extend(this.data, data, true);

            return owl.ajax({
                url: url + owl.ajax.toQueryString(query),
                type: 'PATCH',
                data: data
            })
            .then(function(result) {
                if(result[that.idAttribute]) {
                    that.data[that.idAttribute] = result[that.idAttribute];
                }
                that.trigger('change', Object.keys(data));
                return result;
            });
        },
        /**
         * Remove a model
         * @param query
         * @return Promise
         */
        destroy: function(query) {
            var that = this;
            return owl.ajax({
                url: this.urlRoot + '/' + this.data.id + owl.ajax.toQueryString(query),
                type: 'DELETE'
            })
            .then(function(result) {
                that.clear();
                return result;
            });
        },
        /**
         * Gets data
         * @return {Object}
         */
        getData: function() {
            return this.data;
        },
        /**
         * Gets model collection
         * @return {owl.Collection}
         */
        getCollection: function() {
            return this.collection;
        },
        /**
         * Adds event listener
         * @param event
         * @param listener
         */
        on: function(event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param event
         * @param listener
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
         * @param event
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
         * @param event
         * @param subEvents
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