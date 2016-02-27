(function(owl) {
    function AppView() {
        owl.View.apply(this);
    }
    AppView.prototype = Object.create(owl.View.prototype);
    AppView.prototype.el = document.querySelector('html');
    AppView.prototype.events = {
        'click a': 'click',
        'keyup input': 'keyup'
    };
    AppView.prototype.click = function(event) {
        event.preventDefault();
        console.log('ok');
    };
    owl.AppView = AppView;
})(owl);