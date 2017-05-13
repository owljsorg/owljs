'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (app, owl) {
    var TodoItemView = function (_owl$View) {
        _inherits(TodoItemView, _owl$View);

        function TodoItemView(options) {
            _classCallCheck(this, TodoItemView);

            // update links to data-element
            // and update special events (submit, focus, blur)
            var _this = _possibleConstructorReturn(this, (TodoItemView.__proto__ || Object.getPrototypeOf(TodoItemView)).call(this, {
                className: 'v-todo',
                // you can use any template engine here
                template: function template(data) {
                    return '<label class="checkbox">' + '<input data-element="checkbox" type="checkbox" ' + (data.isDone ? 'checked="checked"' : '') + ' />' + '<span>' + data.title + '</span>' + '</label>';
                },
                events: {
                    'change $checkbox': 'change'
                },
                model: options.model
            }));

            _this.render();
            _this.initListeners();
            return _this;
        }

        _createClass(TodoItemView, [{
            key: 'render',
            value: function render() {
                this.el.innerHTML = this.template(this.model.getData());
                this.update();
            }
        }, {
            key: 'change',
            value: function change(element, event) {
                event.preventDefault();
                this.model.patch({
                    isDone: element.checked
                });
            }
        }, {
            key: 'initListeners',
            value: function initListeners() {
                var _this2 = this;

                this.model.on('change', function () {
                    _this2.render();
                });
            }
        }]);

        return TodoItemView;
    }(owl.View);

    app.TodoItemView = TodoItemView;
})(app, owl);