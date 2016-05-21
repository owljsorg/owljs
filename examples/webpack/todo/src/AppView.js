var owl = require('owl.js');

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