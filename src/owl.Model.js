(function(window, owl) {
    function Model(data, options){
        this.data = data || {};
        this.url = options && options.url || '';
        this.idAttribute = options && options.idAttribute || this.parseIdAttribute(this.url) || 'id';
        this.defaults = options && options.defaults || {};
        this.collection = options && options.collection || null;
        this.collectionIndex = options && typeof options.collectionIndex === 'number' ? options.collectionIndex : null;
        this.events = {};

        // Deprecated
        this.urlRoot = options && options.urlRoot || '';
        if (options.urlRoot) {
            console.log('urlRoot in Model is deprecated, use url instead.');
        }
    }
    Model.prototype = {
        /**
         * Parses Id attribute from url
         * @param url
         */
        parseIdAttribute: function(url) {
            var found = url.match(/:([a-zA-z0-9_]+)/);
            if (found instanceof Array && found.length > 1) {
                return found[1];
            }
            return null;
        },
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
            this.updateCollection();
            this.trigger('change', name);
        },
        /**
         * Gets item url
         * @return {string} item url
         */
        getEndpointUrl: function() {
            var id = this.data[this.idAttribute];
            if (this.url) {
                if (id) {
                    return this.url.replace(':' + this.idAttribute, id);
                }
                return this.url;
            } else {
                if (id) {
                    return this.urlRoot + '/' + id;
                }
                return this.urlRoot;
            }
        },
        /**
         * Gets data from the sever
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        fetch: function(query) {
            var that = this,
                url = this.getEndpointUrl();
            url +=  owl.ajax.toQueryString(query);
            return owl.ajax.request({
                url: url,
                type: 'GET'
            })
            .then(function(result) {
                that.data = result;
                that.updateCollection();
                that.trigger('change', Object.keys(that.data));
                return result;
            });
        },
        /**
         * Removes all attributes from the model
         */
        clear: function() {
            this.data = {};
            this.updateCollection();
        },
        /**
         * Save a model to database
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        save: function(query) {
            var that = this;
            var url = this.getEndpointUrl();
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
                that.updateCollection();
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
            var that = this;
            var id = this.data[this.idAttribute];
            if(!id) {
                return new Promise(function(resolve, reject) {
                    reject(new Error('Can not update model without id'));
                });
            }
            this.data = owl.util.extend(this.data, data, true);
            return this.save(query).then(function(result) {
                that.updateCollection();
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
            var that = this;
            var id = this.data[this.idAttribute];
            if (!id) {
                return new Promise(function(resolve, reject) {
                    reject(new Error('Can not patch model without id'));
                });
            }

            this.data = owl.util.extend(this.data, data, true);
            return owl.ajax.request({
                url: this.getEndpointUrl() + owl.ajax.toQueryString(query),
                type: 'PATCH',
                data: data
            }).then(function(result) {
                that.updateCollection();
                that.trigger('change', Object.keys(data));
                return result;
            });
        },
        /**
         * Updates collection data
         */
        updateCollection: function() {
            if(this.collection) {
                this.collection.update(this.collectionIndex);
            }
        },
        /**
         * Remove a model
         * @param {object} query Request query
         * @return {Promise} Response promise
         */
        destroy: function(query) {
            var that = this;
            var id = this.data[this.idAttribute];
            if (!id) {
                return new Promise(function(resolve, reject) {
                    reject(new Error('Can not destroy model without id'));
                });
            }
            return owl.ajax.request({
                url: this.getEndpointUrl() + owl.ajax.toQueryString(query),
                type: 'DELETE'
            }).then(function(result) {
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
         * Set model data
         */
        setData: function(data) {
            this.data = data;
            this.updateCollection();
            this.trigger('change');
        },
        /**
         * Gets model collection
         * @return {owl.Collection} Model collection
         */
        getCollection: function() {
            return this.collection;
        },
        /**
         * Gets model collection index
         * @return {number} Model collection index
         */
        getCollectionIndex: function() {
            return this.collectionIndex;
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
            if (!event) {
                this.events = [];
            } else if (!listener) {
                delete this.events[event];
            } else if (this.events[event]) {
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