/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1),
	    AppView = __webpack_require__(3),
	    TodoController = __webpack_require__(4),
	    MainRouter = __webpack_require__(9);

	document.addEventListener('DOMContentLoaded', function() {
	    owl.define('appView', function() {
	        return new AppView();
	    });
	    owl.define('todoController', function() {
	        return new TodoController()
	    });

	    owl.history.init({
	        baseUrl: '/webpack/todo/'
	    });
	    owl.history.setDefaultRouter(new MainRouter());
	    owl.history.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	


	(function(window) {
	    var callbacks = {},
	        modules = {};

	    /**
	     * owl
	     */
	    window.owl = {
	        /**
	         * Requires a module
	         * @param {string} name
	         * @return {object}
	         */
	        require: function(name) {
	            if (!modules[name] && callbacks[name]) {
	                modules[name] = callbacks[name]();
	            }
	            if (modules[name]) {
	                return modules[name];
	            } else {
	                throw new Error('Module ' + name + ' is not found');
	            }
	        },
	        /**
	         * Defines a module
	         * @param {string} name
	         * @param {function} callback
	         */
	        define: function(name, callback) {
	            callbacks[name] = callback;
	        }
	    };
	})(window);
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
	        _started = false;

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
	         */
	        open: function(path) {
	            var router;
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
	            router.open(path);
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
	         */
	        open: function(path) {
	            var route = this.getRoute(path);
	            if (!route) {
	                return;
	            }

	            if (this.resolve(route)) {
	                this.run(path, route);
	            }
	        },
	        /**
	         * Calls resolve callback
	         * @private
	         * @param {object} route Route to resolve
	         * @return {boolean}
	         */
	        resolve: function(route) {
	            var resolves = route.resolves;
	            if (resolves && resolves.length) {
	                return resolves.every(function(resolve) {
	                    var callback = owl.history.getResolve(resolve);
	                    if(callback) {
	                        return callback();
	                    } else {
	                        console.info('Resolve' + resolve + 'is not found');
	                        return true;
	                    }
	                });
	            }
	            return true;
	        },
	        /**
	         * Runs the route
	         * @private
	         * @param {string} path Path to run
	         * @param {object} route Route to run
	         */
	        run: function(path, route) {
	            var match,
	                controller,
	                controllerName,
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

	            if (route.action && (route.controller || this.controller)) {
	                controllerName = route.controller || this.controller;
	                controller = owl.require(controllerName);
	                if(controller[route.action]) {
	                    controller[route.action](params);
	                } else {
	                    console.info('Action ' + route.action + ' is missing');
	                }
	            } else if(route.callback) {
	                route.callback(params);
	            } else {
	                console.error('Either controller.action and callback are missing');
	            }
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
	         * Sets controller name
	         * @param {string} controller The name of the related controller
	         */
	        setController: function(controller) {
	            this.controller = controller;
	        },
	        /**
	         * Gets controller name
	         * @return {string} The name of the related controller
	         */
	        getController: function() {
	            return this.controller;
	        }
	    };
	    owl.Router = Router;
	})(window, owl);

	(function(window, owl) {
	    /**
	     * owl.View
	     * @param {object} options
	     * @constructor
	     */
	    function View(options){
	        var that = this;

	        options = options || {};

	        this.el = options.el || window.document.createElement('div');
	        this.elements = {};
	        this.className = options.className || '';
	        this.events = options.events || {};
	        this.template = options.template || null;
	        this.model = options.model;
	        this.collection = options.collection;
	        this.contorller = options.contorller;
	        this.specialEvents = ['submit', 'focus', 'blur'];

	        if (this.className) {
	            this.el.className = this.className;
	        }

	        Object.keys(this.events).forEach(function(event) {
	            var index = event.indexOf(' '),
	                eventName = event.substr(0, index),
	                eventSelector = event.substr(index + 1),
	                method = that.events[event],
	                isElementSelector = eventSelector[0] === '$';

	            if (isElementSelector) {
	                eventSelector = eventSelector.substr(1);
	            }
	            if (that.specialEvents.indexOf(eventName) !== -1) {
	                return;
	            }
	            that.el.addEventListener(eventName, function(event) {
	                var matchingElement = isElementSelector ?
	                that.getMatchingElement(event.target, '[data-element=' + eventSelector + ']') ||
	                that.getMatchingElement(event.target, '[data-elements=' + eventSelector + ']'):
	                    that.getMatchingElement(event.target, eventSelector);

	                if (event.target && matchingElement) {
	                    that.callEventListener(method, matchingElement, event);
	                }
	            });
	        });
	    }

	    View.prototype = {
	        /**
	         * Gets element matching selector
	         * @param {Element} element
	         * @param {string} selector
	         * @return {object}
	         */
	        getMatchingElement: function(element, selector) {
	            while (element && element !== this.el) {
	                if (element.matches(selector)) {
	                    return element;
	                }
	                element = element.parentNode;
	            }
	            return null;
	        },
	        /**
	         * Update events and element
	         * @param {Element} el
	         */
	        update: function(el) {
	            if (!el) {
	                el = this.el;
	            }
	            this.updateEvents(el);
	            this.updateElements(el);
	        },
	        /**
	         * Update events
	         * @param {Element} el
	         */
	        updateEvents: function(el) {
	            var that = this;
	            Object.keys(this.events).forEach(function(event) {
	                var index = event.indexOf(' '),
	                    eventName = event.substr(0, index),
	                    eventSelector = event.substr(index + 1),
	                    method = that.events[event],
	                    isElementSelector = eventSelector[0] === '$';
	                if (that.specialEvents.indexOf(eventName) === -1) {
	                    return;
	                }
	                if (isElementSelector) {
	                    eventSelector = eventSelector.substr(1);
	                    eventSelector = '[data-element=' + eventSelector + '],[data-elements=' + eventSelector + ']';
	                }
	                Array.prototype.forEach.call(el.querySelectorAll(eventSelector), function(element) {
	                    element.addEventListener(eventName, function(event) {
	                        that.callEventListener(method, element, event);
	                    });
	                });
	            });
	        },
	        /**
	         * Update element
	         * @param {Element} el
	         */
	        updateElements: function(el) {
	            var that = this;
	            Array.prototype.forEach.call(el.querySelectorAll('[data-element]'), function(element) {
	                var name = element.getAttribute('data-element');
	                that.elements[name] = element;
	            });
	            Array.prototype.forEach.call(el.querySelectorAll('[data-elements]'), function(element) {
	                var name = element.getAttribute('data-elements');
	                if(!that.elements[name]) {
	                    that.elements[name] = [];
	                }
	                that.elements[name].push(element);
	            });
	        },
	        /**
	         * Calls event listener
	         * @param {string} method
	         * @param {Element} element
	         * @param {Event} event
	         */
	        callEventListener: function(method, element, event) {
	            if(this[method]) {
	                this[method](element, event);
	            } else {
	                console.error('Method ' + method + ' is not defined' +
	                    (this.className ? 'in ' + this.className : ''));
	            }
	        },
	        /**
	         * Calls template function and adds result to element
	         * @param data
	         */
	        render: function(data) {
	            this.el.innerHTML = this.template ? this.template(data) : '';
	            this.update();
	        },
	        /**
	         * Removes element content
	         */
	        remove: function() {
	            this.el.innerHTML = '';
	            this.elements = {};
	        },
	        /**
	         * Finds element in current component by selector
	         * @param {string} selector
	         * @return {Element}
	         */
	        find: function(selector) {
	            return this.el.querySelector(selector);
	        },
	        /**
	         * Finds all elements in current component by selector
	         * @param {string} selector
	         * @return {NodeList}
	         */
	        findAll: function(selector) {
	            return this.el.querySelectorAll(selector);
	        },
	        /**
	         * Gets DOM element related to the view
	         */
	        getEl: function() {
	            return this.el;
	        }
	    };

	    owl.View = View;
	})(window, owl);

	(function(window, owl) {
	    function Model(data, options){
	        this.data = data || {};
	        this.urlRoot = options && options.urlRoot || '';
	        this.idAttribute = options && options.idAttribute || 'id';
	        this.defaults = options && options.defaults || {};
	        this.collection = options && options.collection || null;
	        this.events = {};
	    }
	    Model.prototype = {
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
	            this.trigger('change', name);
	        },
	        /**
	         * Gets data from the sever
	         * @param {object} query Request query
	         * @return {Promise} Response promise
	         */
	        fetch: function(query) {
	            var that = this,
	                url = this.urlRoot;
	            if (this.data[this.idAttribute]) {
	                url += '/' + this.data[this.idAttribute];
	            }
	            url +=  owl.ajax.toQueryString(query);
	            return owl.ajax.request({
	                url: url,
	                type: 'GET'
	            })
	            .then(function(result) {
	                that.data = result;
	                that.trigger('change', Object.keys(that.data));
	                return result;
	            });
	        },
	        /**
	         * Removes all attributes from the model
	         */
	        clear: function() {
	            this.data = {};
	        },
	        /**
	         * Save a model to database
	         * @param {object} query Request query
	         * @return {Promise} Response promise
	         */
	        save: function(query) {
	            var that = this;
	            var url  = this.urlRoot;
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
	            var that = this,
	                id = this.data[this.idAttribute];
	            if(!id) {
	                return new Promise(function(resolve, reject) {
	                    reject('Can not update model without id');
	                });
	            }
	            this.data = owl.util.extend(this.data, data, true);
	            return this
	            .save(query)
	            .then(function(result) {
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
	            var that = this,
	                id = this.data[this.idAttribute],
	                url  = this.urlRoot + '/' + id;
	            if (!id) {
	                return new Promise(function(resolve, reject) {
	                    reject('Can not patch model without id');
	                });
	            }

	            this.data = owl.util.extend(this.data, data, true);
	            return owl.ajax.request({
	                url: url + owl.ajax.toQueryString(query),
	                type: 'PATCH',
	                data: data
	            })
	            .then(function(result) {
	                that.trigger('change', Object.keys(data));
	                return result;
	            });
	        },
	        /**
	         * Remove a model
	         * @param {object} query Request query
	         * @return {Promise} Response promise
	         */
	        destroy: function(query) {
	            var that = this,
	                id = this.data[this.idAttribute];
	            if (!id) {
	                return new Promise(function(resolve, reject) {
	                    reject('Can not destroy model without id');
	                });
	            }
	            return owl.ajax.request({
	                url: this.urlRoot + '/' + id + owl.ajax.toQueryString(query),
	                type: 'DELETE'
	            })
	            .then(function(result) {
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
	         * Gets model collection
	         * @return {owl.Collection} Model collection
	         */
	        getCollection: function() {
	            return this.collection;
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
	            if (this.events[event]) {
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
	(function(window, owl) {
	    /**
	     * owl.Collection
	     * @param {array} data Collection data
	     * @param {object} options Collection options
	     * @constructor
	     */
	    function Collection(data, options){
	        this.url = options.url;
	        this.model = options.model;
	        this.events = {};

	        this.setData(data);
	    }
	    Collection.prototype = {
	        /**
	         * Gets data from server
	         * @param {object} query Query that will be passed with request
	         */
	        fetch: function(query) {
	            var that = this;
	            return owl.ajax.request({
	                url: this.url + owl.ajax.toQueryString(query),
	                type: 'GET'
	            })
	            .then(function(result) {
	                that.setData(result);
	                return result;
	            });
	        },
	        /**
	         * Removes models from collection
	         */
	        clear: function() {
	            this.data = [];
	            this.models = [];
	            this.length = 0;
	            this.trigger('change');
	        },
	        /**
	         * Sets collection data
	         * @param {object} data Collection data
	         */
	        setData: function(data) {
	            var that = this;
	            if (data instanceof Array) {
	                this.data = data;
	                this.length = data.length;
	                this.models = data.map(function(item) {
	                    return new that.model(item, {
	                        collection: that
	                    });
	                });
	            } else {
	                this.data = [];
	                this.models = [];
	                this.length = 0;
	            }
	            that.trigger('change');
	        },
	        /**
	         * Gets collection data
	         * @return {array} Collection data
	         */
	        getData: function() {
	            return this.data;
	        },
	        /**
	         * Gets collection models
	         * @return {array} Collection models
	         */
	        getModels: function() {
	            return this.models;
	        },
	        /**
	         * Gets collection length
	         * @return {number}
	         */
	        getLength: function() {
	            return this.length;
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
	            if (this.events[event]) {
	                this.events[event] = this.events[event].filter(function(currentListener) {
	                    return currentListener !== listener;
	                });
	            }
	        },
	        /**
	         * Triggers event
	         * @param {string} event Event name
	         */
	        trigger: function(event) {
	            var listeners = this.events[event];
	            if (listeners) {
	                listeners.forEach(function(listener) {
	                    listener();
	                });
	            }
	        }
	    };
	    owl.Collection = Collection;
	})(window, owl);
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
	(function(owl) {
	    owl.Promise = Promise;
	})(owl);
	module.exports = owl;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1);

	function AppView() {
	    owl.View.call(this, {
	        el: document.querySelector('html')
	    });
	    // update links to data-element
	    // and update special events (submit, focus, blur)
	    this.update();
	}
	AppView.prototype = Object.create(owl.View.prototype);
	AppView.prototype.showMain = function(view) {
	    this.elements.main.style.display = 'block';
	    this.elements.error.style.display = 'none';
	    this.elements.main.innerHTML = '';
	    this.elements.main.appendChild(view.el);
	};
	AppView.prototype.showError = function() {
	    this.elements.main.style.display = 'none';
	    this.elements.error.style.display = 'block';
	};
	module.exports = AppView;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1),
	    TodoItemCollection = __webpack_require__(5),
	    TodoView = __webpack_require__(7);

	function TodoController() {
	    this.appView = owl.require('appView');
	}
	TodoController.prototype = {
	    readAll: function() {
	        var that = this,
	            todoItemCollection,
	            todoView;

	        todoItemCollection = new TodoItemCollection();
	        todoItemCollection.fetch().then(function() {
	            todoView = new TodoView({
	                controller: this,
	                collection: todoItemCollection
	            });

	            that.appView.showMain(todoView);
	        });
	    }
	};
	module.exports = TodoController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1),
	    TodoItemModel = __webpack_require__(6);

	function TodoItemCollection(data) {
	    owl.Collection.call(this, data, {
	        url: 'todo/items',
	        model: TodoItemModel
	    });
	}
	TodoItemCollection.prototype = Object.create(owl.Collection.prototype);

	module.exports = TodoItemCollection;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1);

	function TodoItemModel(data, options) {
	    owl.Model.call(this, data, {
	        urlRoot: 'todo/items',
	        collection: options && options.collection
	    });
	}
	TodoItemModel.prototype = Object.create(owl.Model.prototype);

	module.exports = TodoItemModel;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1),
	    TodoItemView = __webpack_require__(8),
	    TodoItemModel = __webpack_require__(6);

	function TodoView(options) {
	    owl.View.call(this, {
	        className: 'v-todo',
	        // you can use any templating engine here
	        template: function(data) {
	            return (
	                '<form>' +
	                    '<h1>Todo list</h1>' +
	                    '<input type="text" data-element="title" placeholder="Add a task" />' +
	                    '<div data-element="counter" class="v-todo--counter"></div>' +
	                '</form>' +
	                '<div data-element="items"></div>' +
	                '<div data-element="count"></div>'
	            );
	        },
	        events: {
	            'keyup $title': 'keyup',
	            'submit form': 'submit'
	        },
	        collection: options.collection
	    });
	    this.templateCount = function(data) {
	        return (
	            '<div class="v-todo--count">' +
	                data.countLeft + ' items left' +
	            '</div>'
	        );
	    };
	    // update links to data-element
	    // and update special events (submit, focus, blur)
	    this.render();
	    this.initListeners();
	}
	TodoView.prototype = Object.create(owl.View.prototype);
	TodoView.prototype.render = function() {
	    this.el.innerHTML = this.template();
	    this.update();
	    this.renderItems();
	    this.renderCount();
	};
	TodoView.prototype.renderItems = function() {
	    var that = this,
	        items = this.collection.getModels();
	    this.elements.items.innerHTML = '';
	    items.forEach(function(model) {
	        var todoItemView = new TodoItemView({
	            model: model
	        });
	        that.elements.items.appendChild(todoItemView.getEl());
	    });
	};
	TodoView.prototype.renderCount = function() {
	    var countLeft = 0;
	    this.collection.getModels().forEach(function(model) {
	        if(!model.get('isDone')) {
	            countLeft++;
	        }
	    });
	    this.elements.count.innerHTML = this.templateCount({
	        countLeft: countLeft
	    });
	};
	TodoView.prototype.initListeners = function() {
	    var that = this;
	    this.collection.on('change', function() {
	        that.renderItems();
	        that.renderCount();
	    });
	};
	TodoView.prototype.submit = function(element, event) {
	    var that = this,
	        todoItem;
	    event.preventDefault();
	    todoItem = new TodoItemModel({
	        title: this.elements.title.value,
	        isDone: false
	    });
	    todoItem.save().then(function() {
	        that.collection.fetch();
	    });
	    this.elements.title.value = '';
	};
	TodoView.prototype.keyup = function(element, event) {
	    this.elements.counter.innerHTML = element.value.length || '';
	};

	module.exports = TodoView;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1);

	function TodoItemView(options) {
	    owl.View.call(this, {
	        className: 'v-todo',
	        // you can use any templating engine here
	        template: function(data) {
	            return (
	                '<label class="checkbox">' +
	                    '<input data-element="checkbox" type="checkbox" ' + (data.isDone ? 'checked="checked"' : '') + ' />' +
	                    '<span>' + data.title + '</span>' +
	                '</label>'
	            );
	        },
	        events: {
	            'change $checkbox': 'change'
	        },
	        model: options.model
	    });
	    // update links to data-element
	    // and update special events (submit, focus, blur)
	    this.render();
	    this.initListeners();
	}
	TodoItemView.prototype = Object.create(owl.View.prototype);
	TodoItemView.prototype.render = function() {
	    this.el.innerHTML = this.template(this.model.getData());
	    this.update();
	};
	TodoItemView.prototype.change = function(element, event) {
	    event.preventDefault();
	    this.model.patch({
	        isDone: element.checked
	    });
	};
	TodoItemView.prototype.initListeners = function() {
	    var that = this;
	    this.model.on('change', function() {
	        that.render();
	    });
	};

	module.exports = TodoItemView;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var owl = __webpack_require__(1);

	function MainRouter() {
	    var routes = [{
	            path: '',
	            action: 'readAll'
	        }, {
	            path: 'item/:id',
	            callback: function() {
	                console.log('user');
	            }
	        }],
	        defaultRoute = {
	            callback: function() {
	                console.log('404 page');
	            }
	        };
	    owl.Router.call(this, routes, defaultRoute, 'todoController');
	}
	MainRouter.prototype = Object.create(owl.Router.prototype);

	module.exports = MainRouter;


/***/ }
/******/ ]);