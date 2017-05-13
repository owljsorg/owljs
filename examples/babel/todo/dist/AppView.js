'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (app, owl) {
    var AppView = function (_owl$View) {
        _inherits(AppView, _owl$View);

        function AppView() {
            _classCallCheck(this, AppView);

            // update links to data-element
            // and update special events (submit, focus, blur)
            var _this = _possibleConstructorReturn(this, (AppView.__proto__ || Object.getPrototypeOf(AppView)).call(this, {
                el: document.querySelector('html')
            }));

            _this.update();
            return _this;
        }

        _createClass(AppView, [{
            key: 'showMain',
            value: function showMain(view) {
                this.elements.main.style.display = 'block';
                this.elements.error.style.display = 'none';
                this.elements.main.innerHTML = '';
                this.elements.main.appendChild(view.getEl());
            }
        }, {
            key: 'showError',
            value: function showError() {
                this.elements.main.style.display = 'none';
                this.elements.error.style.display = 'block';
            }
        }]);

        return AppView;
    }(owl.View);

    app.AppView = AppView;
})(app, owl);