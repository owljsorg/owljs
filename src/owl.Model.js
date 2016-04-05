(function(window, owl) {
    function Model(data, options){
        this.data = data || {};
        this.baseUrl = options.baseUrl || '';
        this.idField = options.idField || 'id';
    }
    Model.prototype.get = function(name) {
        return this.data[name];
    };
    Model.prototype.set = function(name, value) {
        this.data[name] = value;
    };
    /**
     * Gets data from the sever
     * @param query
     * @return Promise
     */
    Model.prototype.fetch = function(query) {
        var that = this;
        return owl.ajax({
            url: this.baseUrl + '/' + this.data[this.idField] + owl.ajax.toQueryString(query),
            type: 'GET'
        })
        .then(function(result) {
            that.data = result;
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
        var url  = this.baseUrl;
        var id = this.data[this.idField];
        if(id) {
            url += '/' + this.data[this.idField];
        }
        return owl.ajax({
            url: url + owl.ajax.toQueryString(query),
            type: id ? 'PUT' : 'POST',
            data: this.data
        })
        .then(function(result) {
            if(result[that.idField]) {
                that.data[that.idField] = result[that.idField];
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
        var id = this.data[this.idField];
        var url  = this.baseUrl + '/' + id;
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
                if(result[that.idField]) {
                    that.data[that.idField] = result[that.idField];
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
            url: this.baseUrl + '/' + this.data.id + owl.ajax.toQueryString(query),
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
    owl.Model = Model;
})(window, owl);