(function(window, owl) {
    function Model(data, options){
        this.data = data || {};
        this.urlRoot = options.urlRoot || '';
        this.idAttribute = options.idAttribute || 'id';
        this.defaults = options.defaults;
        this.events = {};
    }
    Model.prototype.get = function(name) {
        return this.data[name] || this.defaults[name];
    };
    Model.prototype.set = function(name, value) {
        this.data[name] = value;
        this.trigger('change:' + name);
    };
    /**
     * Gets data from the sever
     * @param query
     * @return Promise
     */
    Model.prototype.fetch = function(query) {
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
                Object.keys(that.events).forEach(function(name) {
                    if (name.indexOf('change') === 0) {

                    }
                });
                that.trigger('change');
                return result;
            });
    };
    /**
     * Removes all attributes from the model
     */
    Model.prototype.clear = function() {
        this.data = {};
    };
    /**
     * Save a model to database
     * @param query
     * @return Promise
     */
    Model.prototype.save = function(query) {
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
                return result;
            });
    };
    /**
     * Updates local data and saves model
     * @param data
     * @param query
     * @return Promise
     */
    Model.prototype.update = function(data, query) {
        this.data = owl.util.extend(this.data, data);
        this.save(query);
    };
    /**
     * Partially updates model
     * @param data
     * @param query
     * @return Promise
     */
    Model.prototype.patch = function(data, query) {
        var that = this;
        var id = this.data[this.idAttribute];
        var url  = this.urlRoot + '/' + id;
        if(!id) {
            return new Promise(function(resolve, reject) {
                reject('Can not patch model without id');
            });
        }

        this.data = owl.util.extend(this.data, data);

        return owl.ajax({
            url: url + owl.ajax.toQueryString(query),
            type: 'PATCH',
            data: data
        })
            .then(function(result) {
                if(result[that.idAttribute]) {
                    that.data[that.idAttribute] = result[that.idAttribute];
                }
                return result;
            });
    };
    /**
     * Remove a model
     * @param query
     * @return Promise
     */
    Model.prototype.destroy = function(query) {
        var that = this;
        return owl.ajax({
            url: this.urlRoot + '/' + this.data.id + owl.ajax.toQueryString(query),
            type: 'DELETE'
        })
            .then(function(result) {
                that.clear();
                return result;
            });
    };
    /**
     * Gets data
     * @return
     */
    Model.prototype.getData = function() {
        return this.data;
    };
    /**
     * Adds event listener
     * @param event
     * @param listener
     */
    Model.prototype.on = function(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    };
    /**
     * Removes event listener
     * @param event
     * @param listener
     */
    Model.prototype.off = function(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(function(currentListener) {
                return currentListener !== listener;
            });
        }
    };
    /**
     * Triggers event
     * @param event
     */
    Model.prototype.trigger = function(event) {
        var globalEvent = event.substr(0, event.indexOf(':')),
            listeners = this.events[event],
            globalListenres;
        if (listeners) {
            listeners.forEach(function(listener) {
                listener();
            });
        }
        if (globalEvent) {
            globalListenres = this.events[globalEvent];
            if (globalListenres) {
                globalListenres.forEach(function (listener) {
                    listener();
                });
            }
        }
    };
    owl.Model = Model;
})(window, owl);