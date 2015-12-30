(function(Owl) {
    var _headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };

    function toQueryString(json) {
        var query = [],
            key;
        if (!(typeof json === 'object')) {
            return json || '';
        }
        for (key in json) {
            if (json.hasOwnProperty(key)) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]));
            }
        }
        return '?' + query.join('&');
    }

    function toJsonString(json) {
        if (!(typeof json === 'object')) {
            return json || '';
        }
        return JSON.stringify(json);
    }

    Owl.ajax = function (settings) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest(),
                method = settings.type || 'GET',
                url = settings.url,
                data = settings.data,
                body = null,
                key;

            if (method === 'GET' || method === 'DELETE') {
                url += toQueryString(data);
            } else {
                body = toJsonString(data);
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
                        Owl.ajax.error(xhr);
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
            for(key in _headers) {
                if(_headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, _headers[key]);
                }
            }
            xhr.send(body);
        });
    };
    Owl.ajax.setHeader = function(key, value) {
        _headers[key] = value;
    };
    Owl.ajax.removeHeader = function(key, value) {
        delete _headers[key];
    };
    Owl.ajax.error = function(xhr) {
        console.log(xhr);
    };
})(window.Owl);