(function(window, owl) {
    function View(options){
        var that = this;

        options = options || {};

        this.el = options.el || window.document.createElement('div');
        this.elements = {};
        this.className = options.className || '';
        this.events = options.events || {};
        this.template = options.template || null;

        this.el.className = this.className;

        Object.keys(this.events).forEach(function(event) {
            var index = event.indexOf(' '),
                eventName = event.substr(0, index),
                eventSelector = event.substr(index + 1),
                method = that.events[event],
                isElementSelector = eventSelector[0] === '$';

                if (isElementSelector) {
                    eventSelector = eventSelector.substr(1);
                }

            that.el.addEventListener(eventName, function(event) {
                var isSelectorMatches = isElementSelector ?
                    event.target.matches('[data-element=' + eventSelector + ']') ||
                    event.target.matches('[data-elements=' + eventSelector + ']'):
                    event.target.matches(eventSelector);

                if (event.target && isSelectorMatches) {
                    if(that[method]) {
                        that[method](event);
                    } else {
                        console.error('Method ' + method + ' is not defined' +
                            (that.className ? 'in ' + that.className : ''));
                    }
                }
            });
        });
    }
    View.prototype.findElements = function(el) {
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
        this.findElements(this.el);
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