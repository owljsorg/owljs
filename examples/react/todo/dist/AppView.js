'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (app) {
    var AppView = function () {
        function AppView() {
            _classCallCheck(this, AppView);
        }

        _createClass(AppView, [{
            key: 'show',
            value: function show(view) {
                ReactDOM.render(view, document.querySelector('body'));
            }
        }, {
            key: 'showError',
            value: function showError() {
                ReactDOM.render(React.createElement(
                    'div',
                    null,
                    'Page not found'
                ), document.querySelector('body'));
            }
        }]);

        return AppView;
    }();

    app.AppView = AppView;
})(app, owl);