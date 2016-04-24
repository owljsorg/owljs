(function(window, owl) {
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
         * @param element
         * @param selector
         * @returns Object
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
         * @param el
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
         * @param el
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
         * @param el
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
         * @param method
         * @param element
         * @param event
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
         * @param selector
         * @returns {Element}
         */
        find: function(selector) {
            return this.el.querySelector(selector);
        },
        /**
         * Finds all elements in current component by selector
         * @param selector
         * @returns {NodeList}
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
