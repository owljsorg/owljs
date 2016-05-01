(function(owl) {
    var _headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };

    owl.ajax = {
        /**
         * Makes request to the server
         * @param {object} settings
         * @return {object}
         */
        request: function (settings) {
            var that = this;
            return new owl.Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest(),
                    method = settings.type || 'GET',
                    url = settings.url,
                    data = settings.data,
                    body = null,
                    key;

                if (method === 'GET' || method === 'DELETE') {
                    url += that.toQueryString(data);
                } else {
                    body = that.toJsonString(data);
                }
                xhr.onreadystatechange = function() {
                    var response,
                        error;
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            response = JSON.parse(xhr.responseText);
                            settings.success && settings.success(response);
                            resolve(response);
                        } else {
                            owl.ajax.error(xhr);
                            settings.error && settings.error(xhr, xhr.statusText);
                            error = new Error('Respond with ' + xhr.status);
                            error.status = xhr.status;
                            error.responseText = xhr.responseText;
                            error.json = JSON.parse(xhr.responseText);
                            reject(error);
                        }
                    }
                };
                xhr.open(method, url, true);
                for (key in _headers) {
                    if (_headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, _headers[key]);
                    }
                }
                xhr.send(body);
            });
        },
        /**
         * Sets a header for each request
         * @param {string} key
         * @param {string} value
         */
        setHeader: function(key, value) {
            _headers[key] = value;
        },
        /**
         * Removes a header
         * @param {string} key
         */
        removeHeader: function(key) {
            delete _headers[key];
        },
        /**
         * Default event error listener
         * @param xhr
         */
        error: function(xhr) {
            console.log(xhr);
        },
        /**
         * Makes query string from data
         * @param {object} data
         * @return {string}
         */
        toQueryString: function(data) {
            var query = [],
                key;
            if (!(typeof data === 'object')) {
                return data || '';
            }
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            return '?' + query.join('&');
        },
        /**
         * Stringify an object
         * @param data
         * @return {string}
         */
        toJsonString: function(data) {
            if (!(typeof data === 'object')) {
                return data || '';
            }
            return JSON.stringify(data);
        }
    };
})(window.owl);