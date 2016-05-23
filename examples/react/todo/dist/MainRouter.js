'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (app, owl) {
    var MainRouter = function (_owl$Router) {
        _inherits(MainRouter, _owl$Router);

        function MainRouter() {
            _classCallCheck(this, MainRouter);

            var todoController = owl.require('todoController'),
                routes = [{
                path: '',
                action: 'readAll'
            }, {
                path: 'item/:id',
                callback: function callback() {
                    console.log('user');
                }
            }],
                defaultRoute = {
                callback: function callback() {
                    console.log('404 page');
                }
            };
            return _possibleConstructorReturn(this, Object.getPrototypeOf(MainRouter).call(this, routes, defaultRoute, todoController));
        }

        return MainRouter;
    }(owl.Router);

    app.MainRouter = MainRouter;
})(app, owl);