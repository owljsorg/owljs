(function(window, owl) {
    function View(){
        var el = this.el;

        if (!el) {
            this.el = window.document.createElement('div');
        }
        el.className = this.className;

        Object.keys(this.events).forEach(function(event) {
            var index = event.indexOf(' '),
                eventName = event.substr(0, index),
                eventSelector = event.substr(index + 1);
            el.addEventListener(eventName, function() {
                console.log('ok');
            });
        });
    }
    View.prototype.className = '';
    View.prototype.events = [];
    View.prototype.template = function() {
        return '';
    };
    View.prototype.init = function(options) {

    };
    View.prototype.render = function() {
        this.el.innerHTML = this.template();
    };
    View.prototype.find = function(selector) {
        return this.el.querySelector(selector);
    };
    View.prototype.findAll = function(selector) {
        return this.el.querySelectorAll(selector);
    };

    owl.View = View;
})(window, owl);