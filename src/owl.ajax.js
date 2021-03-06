(function(owl) {
    var _headers = {};

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
                    files = settings.files,
                    body = null,
                    key;

                if (method === 'GET' || method === 'DELETE') {
                    url += that.toQueryString(data);
                } else if (typeof files === 'object') {
                    body = new FormData();
                    Object.keys(data).forEach(function(key) {
                        body.append(key, data[key]);
                    });
                    Object.keys(files).forEach(function(key) {
                        body.append(key, files[key]);
                    });
                } else {
                    body = that.toJsonString(data);
                }
                xhr.onreadystatechange = function() {
                    var response = {
                            status: 0,
                            headers: {},
                            data: {}
                        },
                        error;
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                response.data = JSON.parse(xhr.responseText);
                            } catch (err) {
                                reject(err);
                                return;
                            }

                            response.headers = that.parseHeaders(xhr);
                            response.status = xhr.status;

                            settings.success && settings.success(response);
                            resolve(response);
                        } else {
                            owl.ajax.error(xhr);
                            settings.error && settings.error(xhr, xhr.statusText);
                            error = new owl.AjaxError(xhr);
                            reject(error);
                        }
                    }
                };
                xhr.open(method, url, true);

                if (typeof files !== 'object') {
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                }

                Object.keys(_headers).forEach(function(key) {
                    xhr.setRequestHeader(key, _headers[key]);
                });

                xhr.send(body);
            });
        },
        parseHeaders: function(xhr) {
            var headersString = xhr.getAllResponseHeaders(),
                headers = {};
            headersString.split('\n').forEach(function (item) {
                var parts;
                if (item.trim() === '') {
                    return;
                }
                parts = item.split(':');
                headers[parts[0].trim()] = parts[1].trim();
            });
            return headers;
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
})(owl);