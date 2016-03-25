(function(window, owl) {
    function Model(data, options){
        this.data = data || {};
        this.baseUrl = options.baseUrl || '';
        this.idField = options.idField || 'id';
    }
    Model.prototype.get = function(name) {
        return this.json[name];
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
        return owl.ajax({
            url: this.baseUrl + '/' + this.data[this.idField] + owl.ajax.toQueryString(query),
            type: 'GET'
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
        var url  = this.baseUrl;
        var id = this.data[this.idField];
        if(id) {
            url += '/' + this.data[this.idField];
        }
        return owl.ajax({
            url: url + owl.ajax.toQueryString(query),
            type: id ? 'PUT' : 'POST',
            data: this.data
        });
    };
    /**
     * Remove a model
     * @param query
     * @return Promise
     */
    Model.prototype.destroy = function(query) {
        return owl.ajax({
            url: this.baseUrl + '/' + this.data.id + owl.ajax.toQueryString(query),
            type: 'DELETE'
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