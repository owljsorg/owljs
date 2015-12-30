(function(window, owl) {
    function View(){
        this.el = window.document.createElement('div');
        this.el.classList.add(this.className);

        this.events.forEach(function(event) {
            var index = event.indexOf(' ');
            console.log(event.substr(0, index));
            console.log(event.substr(index));
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