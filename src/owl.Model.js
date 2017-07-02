(function(window, owl) {
    function Model(data, options) {
        owl.EventEmitter.apply(this, [data, options]);

        this.data = data || {};
        this.url = options && options.url || '';
        this.idAttribute = options && options.idAttribute || this.parseIdAttribute(this.url) || 'id';
        this.defaults = options && options.defaults || {};
        this.collection = options && options.collection || null;
        this.collectionIndex = options && typeof options.collectionIndex === 'number' ? options.collectionIndex : null;

        // Deprecated
        this.urlRoot = options && options.urlRoot || '';
        if (options.urlRoot) {
            console.log('urlRoot in Model is deprecated, use url instead.');
        }
    }
    Model.prototype = Object.create(owl.EventEmitter.prototype);

    /**
     * Parses Id attribute from url
     * @param url
     */
    Model.prototype.parseIdAttribute = function(url) {
        var found = url.match(/:([a-zA-z0-9_]+)/);
        if (found instanceof Array && found.length > 1) {
            return found[1];
        }
        return null;
    };
    /**
     * Gets attribute by name
     * @param {string} name Attribute name
     * @return {array}
     */
    Model.prototype.get = function(name) {
        return this.data[name] || this.defaults[name];
    };
    /**
     * Sets attribute value by name
     * @param {string} name Attribute name
     * @param {any} value Attribute value
     */
    Model.prototype.set = function(name, value) {
        this.data[name] = value;
        this.updateCollection();
        this.trigger('change', name);
    };
    /**
     * Gets item url
     * @return {string} item url
     */
     Model.prototype.getEndpointUrl = function() {
        var id = this.data[this.idAttribute];
        if (this.url) {
            if (id) {
                return this.url.replace(':' + this.idAttribute, id);
            }
            return this.url.replace('/:' + this.idAttribute, '');
        } else {
            if (id) {
                return this.urlRoot + '/' + id;
            }
            return this.urlRoot;
        }
    };
    /**
     * Gets data from the sever
     * @param {object} query Request query
     * @return {Promise} Response promise
     */
    Model.prototype.fetch = function(query) {
        var that = this,
            url = this.getEndpointUrl();
        url +=  owl.ajax.toQueryString(query);
        return owl.ajax.request({
            url: url,
            type: 'GET'
        })
        .then(function(result) {
            that.data = result.data;
            that.updateCollection();
            that.trigger('change', Object.keys(that.data));
            return result.data;
        });
    };
    /**
     * Removes all attributes from the model
     */
    Model.prototype.clear = function() {
        this.data = {};
        this.updateCollection();
    };
    /**
     * Save a model to database
     * @param {object} query Request query
     * @return {Promise} Response promise
     */
    Model.prototype.save = function(query) {
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
            var data = result.data;
            if(data[that.idAttribute]) {
                that.data[that.idAttribute] = data[that.idAttribute];
            }
            that.updateCollection();
            that.trigger('change', [that.idAttribute]);
            return data;
        });
    };
    /**
     * Updates local data and saves model
     * @param {object} data Data to update
     * @param {object} query Request query
     * @return {Promise} Response promise
     */
    Model.prototype.update = function(data, query) {
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
            return result.data;
        });
    };
    /**
     * Partially updates model
     * @param {object} data Data to patch
     * @param {object} query Request query
     * * @param {string} path Additional path
     * @return {Promise} Response promise
     */
    Model.prototype.patch = function(data, query, path) {
        var that = this;
        var url = this.getEndpointUrl();

        if (typeof path === 'string') {
            url += path;
        }

        if (typeof query === 'object' && query !== null) {
            url += owl.ajax.toQueryString(query);
        }

        this.data = owl.util.extend(this.data, data, true);
        return owl.ajax.request({
            url: url,
            type: 'PATCH',
            data: data
        }).then(function(result) {
            that.updateCollection();
            that.trigger('change', Object.keys(data));
            return result.data;
        });
    };
    /**
     * Updates collection data
     */
    Model.prototype.updateCollection = function() {
        if(this.collection) {
            this.collection.update(this.collectionIndex);
        }
    };
    /**
     * Remove a model
     * @param {object} query Request query
     * @return {Promise} Response promise
     */
    Model.prototype.destroy = function(query) {
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
            return result.data;
        });
    };
    /**
     * Gets models data
     * @return {object} Model data
     */
    Model.prototype.getData = function() {
        return this.data;
    };
    /**
     * Set model data
     */
    Model.prototype.setData = function(data) {
        this.data = data;
        this.updateCollection();
        this.trigger('change');
    };
    /**
     * Gets model collection
     * @return {owl.Collection} Model collection
     */
    Model.prototype.getCollection = function() {
        return this.collection;
    };
    /**
     * Gets model collection index
     * @return {number} Model collection index
     */
    Model.prototype.getCollectionIndex = function() {
        return this.collectionIndex;
    };

    /**
     * Trigger single event
     * @param {string} event Event name
     * @param {any?} payload Payload
     */
    Model.prototype.emit = function(event, payload) {
        if(this.collection) {
            this.collection.emit(event, payload);
        }
        return owl.EventEmitter.prototype.emit.apply(this, [event, payload]);
    };
    owl.Model = Model;
})(window, owl);