(function(window, owl) {
    function View(options){
        var that = this;

        options = options || {};

        this.el = options.el || window.document.createElement('div');
        this.className = options.className || '';
        this.events = options.events || {};
        this.template = options.template || null;

        this.el.className = this.className;

        Object.keys(this.events).forEach(function(event) {
            var index = event.indexOf(' '),
                eventName = event.substr(0, index),
                eventSelector = event.substr(index + 1),
                method = that.events[event];
            that.el.addEventListener(eventName, function(event) {
                if (event.target && event.target.matches(eventSelector)) {
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
    View.prototype.render = function(data) {
        this.el.innerHTML = this.template ? this.template(data) : '';
    };
    View.prototype.find = function(selector) {
        return this.el.querySelector(selector);
    };
    View.prototype.findAll = function(selector) {
        return this.el.querySelectorAll(selector);
    };

    owl.View = View;
})(window, owl);