


var owl = {
    require: function() {
        console.info('Please use require instead of owl.require');
    },
    define: function() {
        console.info('Please use module.exports instead of owl.define');
    }
};
(function(window, owl) {
    var _options,
        _defaultOptions = {
            baseUrl: '/'
        },
        _defaultRouter = null,
        _listener,
        _routers = {},
        _resolves = {},
        _events = {},
        _started = false,
        _destroyFunction = null;

    owl.history = {
        /**
         * Init the history
         * @param options
         */
        init: function(options) {
            _options = owl.util.extend(_defaultOptions, options, true);
        },
        /**
         * Gets an option
         * @param name
         * @return {any}
         */
        getOption: function(name) {
            return _options[name];
        },
        /**
         * Starts watching popstate event
         */
        start: function() {
            var that = this;
            this.open(this.getLocation());
            _listener = window.addEventListener('popstate', function() {
                that.open(that.getLocation());
            }, false);
            _started = true;
        },
        /**
         * Checks is history started
         * @return {boolean}
         */
        isStarted: function() {
            return _started;
        },
        /**
         * Stop watching popstate event
         */
        stop: function() {
            window.removeEventListener('popstate', _listener);
        },
        /**
         * Adds new item to the navigation history
         * @param path
         */
        navigate: function(path) {
            window.history.pushState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        /**
         * Replaces current item in the navigation history
         * @param path
         */
        replace: function(path) {
            window.history.replaceState(null, null, _options.baseUrl + path);
            this.open(path);
        },
        /**
         * Gets current location
         * @return {string}
         */
        getLocation: function () {
            return window.location.pathname.replace(_options.baseUrl, '').replace(/\/$/, '');
        },
        /**
         * Gets current hash
         * @return {string}
         */
        getHash: function() {
            return window.location.hash.substr(1);
        },
        /**
         * Sets hash
         * @param hash
         */
        setHash: function(hash) {
            window.location.hash = hash;
        },
        /**
         * Opens the page by path
         * @param path
         * @return {Promise} A promise that resolves to set destroyer function if any given
         */
        open: function(path) {
            var router;
            if (_destroyFunction) {
                _destroyFunction();
                _destroyFunction = null;
            }
            Object.keys(_routers).some(function(routerPath) {
                if(path === routerPath ||
                    (path.indexOf(routerPath) === 0 && path.length > routerPath.length && path[routerPath.length] === '/')) {
                    router = _routers[routerPath];
                    path = path.replace(routerPath, '');
                    return true;
                }
                return false;
            });
            if (!router) {
                router = _defaultRouter;
            }
            if (!router) {
                console.log('Default router is not defined');
                return;
            }
            this.trigger('change');

            return router.open(path).then(function (destroyer) {
              _destroyFunction = destroyer;
            });
        },
        /**
         * Sets router by name
         * @param name
         * @param router
         */
        setRouter: function(path, router) {
            _routers[path] = router;
        },
        /**
         * Removes router by name
         * @param name
         */
        removeRouter: function(path) {
            delete _routers[path];
        },
        /**
         * Gets router by name
         * @param name
         * @return {owl.Router}
         */
        getRouter: function(path) {
            return _routers[path];
        },
        /**
         * Sets default router
         * @param router
         */
        setDefaultRouter: function(router) {
            _defaultRouter = router;
        },
        /**
         * Gets default router
         */
        getDefaultRouter: function() {
            return _defaultRouter;
        },
        /**
         * Sets resolve
         * @param resolveName
         * @param resolveCallback
         */
        setResolve: function(resolveName, resolveCallback) {
            _resolves[resolveName] = resolveCallback;
        },
        /**
         * Removes resolve by name
         * @param resolveName
         */
        removeResolve: function(resolveName) {
            delete _resolves[resolveName];
        },
        /**
         * Gets resolve by name
         * @param resolveName
         */
        getResolve: function(resolveName) {
            return _resolves[resolveName];
        },
        /**
         * Adds event listener
         * @param event
         * @param listener
         */
        on: function(event, listener) {
            if (!_events[event]) {
                _events[event] = [];
            }
            _events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param event
         * @param listener
         */
        off: function(event, listener) {
            if (_events[event]) {
                var listenerIndex = -1;
                _events[event].forEach(function(func, index) {
                    if(func === listener) {
                        listenerIndex = index;
                    }
                });
                _events[event].splice(listenerIndex, 1);
            }
        },
        /**
         * Trigger event
         * @param event
         */
        trigger: function(event) {
            _events[event] && _events[event].forEach(function(listener) {
                listener();
            });
        }
    };
})(window, owl);

(function(window, owl) {
    /**
     * owl.util
     */
    owl.util = {
        /**
         * Clones an object
         * @param {object} object
         * @param {boolean} isRecursive
         * @return {object}
         */
        clone: function(object, isRecursive) {
            var that = this,
                copy;

            if (null === object || typeof object !== 'object') {
                return object;
            }

            if (object instanceof Date) {
                copy = new Date();
                copy.setTime(object.getTime());
                return copy;
            }

            if (object instanceof Array) {
                copy = [];
                object.forEach(function(element, index) {
                    copy[index] = that.clone(element);
                });
                return copy;
            }

            copy = {};
            Object.keys(object).forEach(function(key) {
                copy[key] = isRecursive ? that.clone(object[key], isRecursive) : object[key];
            });
            return copy;
        },
        /**
         * Extends and object
         * @param {object} firstObject
         * @param {object} secondObject
         * @param {boolean} isRecursive
         * @return {object}
         */
        extend: function(firstObject, secondObject, isRecursive) {
            var that = this,
                result = this.clone(firstObject, true);

            Object.keys(secondObject).forEach(function(key) {
                if (typeof result[key] === 'object' && result[key] !== null && isRecursive) {
                    result[key] = that.extend(result[key], secondObject[key], isRecursive);
                } else {
                    result[key] = secondObject[key];
                }
            });

            return result;
        }
    };
}(window, owl));
(function(window, owl) {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype = {
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
        emit: function(event) {
            var listeners = this.events[event];
            if (listeners) {
                listeners.forEach(function(listener) {
                    listener();
                });
            }
        },
        /**
         * Deprecated, use emit instead
         * Triggers single event
         * @param {string} event Event name
         */
        triggerSingle: function(event) {
            this.emit(event);
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
    owl.EventEmitter = EventEmitter;
})(window, owl);
(function(window, owl) {
    /**
     * owl.Router
     * @param {array} routes List of routers
     * @param {object} defaultRoute Default route
     * @param {string} controller The name of the related controller
     * @constructor
     */
    function Router(routes, defaultRoute, controller){
        var that = this;
        this.routes = [];
        this.defaultRoute = defaultRoute || ({
                callback: function() {
                    console.log('Default route is not defined');
                }
            });
        this.controller = controller || null;

        if (routes instanceof Array) {
            routes.forEach(function(route) {
                that.addRoute(route);
            });
        }
    }
    Router.prototype = {
        /**
         * Opens page by path
         * @param {string} path Page path
         * @return {Promise<?function>} Function to destroy controller
         */
        open: function(path) {
            var route = this.getRoute(path), that = this;
            if (!route) {
                return owl.Promise.resolve(null);
            }

            return this.resolve(route).then(function (resolveResult) {
                return that.run(path, route, resolveResult);
            }).catch(function (e) {
                console.error('Error in Router.open', e.message, e.stack);
                return that.run(path, that.defaultRoute, e);
            });
        },
        /**
         * Calls resolve callback
         * @private
         * @param {object} route Route to resolve
         * @return {Promise<array>}
         */
        resolve: function(route) {
            var resolves = route.resolves || [];
            return owl.Promise.all(resolves.map(function (resolve) {
                const callback = owl.history.getResolve(resolve);
                if (callback) {
                    return owl.Promise.resolve(callback());
                } else {
                    console.info('Resolve' + resolve + 'is not found');
                    return owl.Promise.resolve(null);
                }
            }));
        },
        /**
         * Runs the route
         * @private
         * @param {string} path Path to run
         * @param {object} route Route to run
         * @param {array} resolveResult Result of resolvers in router
         * @return {function} Function to destroy controller
         */
        run: function(path, route, resolveResult) {
            var match,
                controller,
                action,
                i,

                params = {};

            if (route.regexp) {
                match = path.match(route.regexp);
                if (match) {
                    for (i = 1; i < match.length; i++) {
                        params[route.params[i - 1]] = match[i];
                    }
                }
            }

            if (route.controller || this.controller && !route.callback) {
                controller = new (route.controller || this.controller)(params);
                action = route.action || 'init';
                if (action && controller[action]) {
                    controller[action](params, resolveResult);
                }
                if (controller.destroy) {
                    return controller.destroy.bind(controller);
                }
            } else if (route.callback) {
                route.callback(params, resolveResult);
            } else {
                console.error('Either controller and callback are missing');
            }
            return null;
        },
        /**
         * Adds a route
         * @param {object} route Route to add
         */
        addRoute: function(route) {
            var paramRegexp = /:[a-zA-Z0-9]*/g,
                pattern = route.path.replace(paramRegexp, '([^/]*)'),
                match = route.path.match(paramRegexp),
                params = {};
            if (match) {
                route.regexp = new RegExp('^' + pattern + '$');
                params = match.map(function(param) {
                    return param.substring(1);
                });
            }
            route.params = params;
            this.routes.push(route);
        },
        /**
         * Returns the route by path
         * @param {string} path Path
         * @return {object}
         */
        getRoute: function(path) {
            var that = this,
                route;
            this.routes.some(function(currentRoute) {
                var test = currentRoute.regexp ? currentRoute.regexp.test(path) : currentRoute.path === path;
                if(test) {
                    route = currentRoute;
                    return true;
                }
                return false;
            });
            if (route) {
                return route;
            } else {
                return this.defaultRoute;
            }
        },
        /**
         * Sets default route
         * @param {object} route Route
         */
        setDefaultRoute: function(route) {
            this.defaultRoute = route;
        },
        /**
         * Gets default route
         * @return {object}
         */
        getDefaultRoute: function() {
            return this.defaultRoute;
        },
        /**
         * Sets controller
         * @param {Object} controller Related controller
         */
        setController: function(controller) {
            this.controller = controller;
        },
        /**
         * Gets controller
         * @return {string} Related controller
         */
        getController: function() {
            return this.controller;
        }
    };
    owl.Router = Router;
})(window, owl);

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
            that.data = result;
            that.updateCollection();
            that.trigger('change', Object.keys(that.data));
            return result;
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
            if(result[that.idAttribute]) {
                that.data[that.idAttribute] = result[that.idAttribute];
            }
            that.updateCollection();
            that.trigger('change', [that.idAttribute]);
            return result;
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
            return result;
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
            return result;
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
            return result;
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
     */
    Model.prototype.emit = function(event) {
        if(this.collection) {
            this.collection.trigger(event);
        }
        return owl.EventEmitter.prototype.emit.apply(this, [event]);
    };
    owl.Model = Model;
})(window, owl);
(function(window, owl) {
    /**
     * owl.Collection
     * @param {array} data Collection data
     * @param {object} options Collection options
     * @constructor
     */
    function Collection(data, options){
        owl.EventEmitter.apply(this, [data, options]);

        this.url = options.url;
        this.model = options.model;
        this.data = [];
        this.models = [];

        this.setData(data);
    }
    Collection.prototype = Object.create(owl.EventEmitter.prototype);

    /**
     * Gets data from server
     * @param {object} query Query that will be passed with request
     */
    Collection.prototype.fetch = function(query) {
        var that = this;
        return owl.ajax.request({
            url: this.url + owl.ajax.toQueryString(query),
            type: 'GET'
        })
        .then(function(result) {
            that.setData(result);
            return result;
        });
    };

    /**
     * Removes models from collection
     */
    Collection.prototype.clear = function() {
        this.data = [];
        this.models = [];
        this.length = 0;
        this.trigger('change');
    };

    /**
     * Sets collection data
     * @param {object} data Collection data
     */
    Collection.prototype.setData = function(data) {
        var that = this;
        if (data instanceof Array) {
            this.data = data;
            this.length = data.length;
            this.models = data.map(function(item, index) {
                return new that.model(item, {
                    collection: that,
                    collectionIndex: index
                });
            });
        } else {
            this.models = [];
            this.length = 0;
        }
        that.trigger('change');
    };
    /**
     * Gets collection data
     * @return {array} Collection data
     */
    Collection.prototype.getData = function() {
        return this.data;
    };

    /**
     * Gets collection models
     * @return {array} Collection models
     */
    Collection.prototype.getModels = function() {
        return this.models;
    };

    /**
     * Gets collection length
     * @return {number}
     */
    Collection.prototype.getLength = function() {
        return this.length;
    };

    /**
     * Gets a model by index
     */
    Collection.prototype.get = function(index) {
       return this.models[index];
    };

    /**
     * Updates collection data
     */
    Collection.prototype.update = function(index) {
        if (typeof index === 'number') {
            this.data[index] = this.models[index].getData();
        } else {
            this.data = this.models.map(function(model) {
                return model.getData();
            });
        }
    };
    owl.Collection = Collection;
})(window, owl);
(function(window, owl) {
    /**
     * owl.Controller
     * @constructor
     */
    function Controller() {

    }

    /**
     * Init a controller
     * Will be called after navigate to new page
     * If action is defined in route it will be called instead of init
     */
    Controller.prototype.init = function() {

    };

    /**
     * Removes all data created by controller
     * Will be called before navigate to new page
     */
    Controller.prototype.destroy = function() {

    };

    owl.Controller = Controller;
})(window, owl);
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
(function(owl) {
    owl.Promise = Promise;
})(owl);
(function(window, owl) {
    /**
     * owl.AjaxError
     * @param {XMLHttpRequest} xhr
     * @constructor
     */
    function AjaxError(xhr) {
        this.message = 'Respond with ' + xhr.status;
        this.status = xhr.status;
        this.text = xhr.responseText;
        try {
            this.data = JSON.parse(xhr.responseText);
        } catch (e) {
            this.data = {};
        }

        // Deprecated
        this.responseText = this.text;
        this.json = this.data;
    }

    AjaxError.prototype = new Error();

    /**
     * Gets response message
     * @returns {string}
     */
    AjaxError.prototype.getMessage = function() {
        return this.message;
    };

    /**
     * Gets response status
     * @returns {number}
     */
    AjaxError.prototype.getStatus = function() {
        return this.status;
    };

    /**
     * Gets response text
     * @returns {string}
     */
    AjaxError.prototype.getText = function() {
        return this.text;
    };

    /**
     * Gets response data
     * @returns {object}
     */
    AjaxError.prototype.getData = function() {
        return this.data;
    };

    owl.AjaxError = AjaxError;
})(window, owl);
module.exports = owl;
