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
            if (eventName === 'submit') {
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

    View.prototype.getMatchingElement = function(element, selector) {
        while (element && element !== this.el) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    };

    View.prototype.update = function(el) {
        if (!el) {
            el = this.el;
        }
        this.updateEvents(el);
        this.updateElements(el);
    };

    View.prototype.updateEvents = function(el) {
        var that = this;
        Object.keys(this.events).forEach(function(event) {
            var index = event.indexOf(' '),
                eventName = event.substr(0, index),
                eventSelector = event.substr(index + 1),
                method = that.events[event],
                isElementSelector = eventSelector[0] === '$';
            if (eventName !== 'submit') {
                return;
            }
            if (isElementSelector) {
                eventSelector = eventSelector.substr(1);
                eventSelector = '[data-element=' + eventSelector + '],[data-elements=' + eventSelector + ']';
            }
            Array.from(el.querySelectorAll(eventSelector)).forEach(function(element) {
                element.addEventListener(eventName, function(event) {
                    that.callEventListener(method, element, event);
                });
            });
        });
    };
    View.prototype.callEventListener = function(method, element, event) {
        if(this[method]) {
            this[method](element, event);
        } else {
            console.error('Method ' + method + ' is not defined' +
                (that.className ? 'in ' + that.className : ''));
        }
    };

    View.prototype.updateElements = function(el) {
        var that = this;
        Array.from(el.querySelectorAll('[data-element]')).forEach(function(element) {
            var name = element.getAttribute('data-element');
            that.elements[name] = element;
        });
        Array.from(el.querySelectorAll('[data-elements]')).forEach(function(element) {
            var name = element.getAttribute('data-elements');
            if(!that.elements[name]) {
                that.elements[name] = [];
            }
            that.elements[name].push(element);
        });
    };

    View.prototype.render = function(data) {
        this.el.innerHTML = this.template ? this.template(data) : '';
        this.update();
    };

    View.prototype.remove = function() {
        this.el.innerHTML = null;
        this.elements = {};
    };

    View.prototype.find = function(selector) {
        return this.el.querySelector(selector);
    };

    View.prototype.findAll = function(selector) {
        return this.el.querySelectorAll(selector);
    };

    owl.View = View;
})(window, owl);