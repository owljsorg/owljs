(function(window, owl) {
    document.addEventListener('DOMContentLoaded', function() {
        owl.define('app', function() {
            return new owl.App();
        });
        owl.define('router', function() {
            return new owl.Router();
        });
    });
})(window, owl);