(function(window, owl) {
    function Model(id){
        this.data = {
            id: id
        };
        this.baseUrl = '';
        this.idAttribute = 'id';
    }
    Model.prototype.get = function(name) {
        return this.json[name];
    };
    Model.prototype.set = function(name, value) {
        this.data[name] = value;
    };
    /**
     * Gets data from the sever
     * @param data
     * @return Promise
     */
    Model.prototype.fetch = function(query) {
        return owl.ajax({
            url: this.url + '/' + this.data[this.idAttribute] + owl.ajax.toQueryString(query),
            type: 'GET'
        });
    };
    /**
     * Removes all attributes from the model
     * @param data
     */
    Model.prototype.clear = function() {
        this.data = {};
    };
    /**
     * Save a model to database
     * @param options
     * @return Promise
     */
    Model.prototype.save = function(query) {
        var url  = this.url;
        if(this.data[this.idAttribute]) {
            url += '/' + this.data[this.idAttribute];
        }
        return owl.ajax({
            url: url + owl.ajax.toQueryString(query),
            type: this.data[this.idAttribute] ? 'PUT' : 'POST',
            data: this.data
        });
    };
    /**
     * Remove a model
     * @param options
     * @return Promise
     */
    Model.prototype.destroy = function(query) {
        return owl.ajax({
            url: this.url + '/' + this.data.id + owl.ajax.toQueryString(query),
            type: 'DELETE'
        });
    };
    /**
     * Gets data
     * @return
     */
    Model.prototype.getJson = function() {
        return this.data;
    };
    owl.Model = Model;
})(window, owl);