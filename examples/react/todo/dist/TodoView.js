'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (app) {
    var TodoView = function (_React$Component) {
        _inherits(TodoView, _React$Component);

        function TodoView(props) {
            _classCallCheck(this, TodoView);

            var _this = _possibleConstructorReturn(this, (TodoView.__proto__ || Object.getPrototypeOf(TodoView)).call(this, props));

            _this.state = {
                title: ''
            };
            return _this;
        }

        _createClass(TodoView, [{
            key: 'onTitleChange',
            value: function onTitleChange() {
                this.setState({
                    title: this.refs.title.value
                });
            }
        }, {
            key: 'onSubmit',
            value: function onSubmit(event) {
                event.preventDefault();
                this.props.controller.addItem(this.state.title);
                this.setState({
                    title: ''
                });
            }
        }, {
            key: 'renderItems',
            value: function renderItems() {
                var _this2 = this;

                return this.props.items.getModels().map(function (item) {
                    return React.createElement(app.TodoItemView, {
                        item: item,
                        controller: _this2.props.controller
                    });
                });
            }
        }, {
            key: 'renderCount',
            value: function renderCount() {
                var countLeft = 0;
                this.props.items.getData().forEach(function (item) {
                    if (!item.isDone) {
                        countLeft++;
                    }
                });
                return React.createElement(
                    'div',
                    { className: 'v-todo--count' },
                    countLeft,
                    ' items left'
                );
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.onSubmit.bind(this) },
                        React.createElement(
                            'h1',
                            null,
                            'Todo list'
                        ),
                        React.createElement('input', {
                            ref: 'title',
                            type: 'text',
                            value: this.state.title,
                            placeholder: 'Add a task',
                            onChange: this.onTitleChange.bind(this) }),
                        React.createElement(
                            'div',
                            { className: 'v-todo--counter' },
                            this.state.title.length
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        this.renderItems()
                    ),
                    React.createElement(
                        'div',
                        null,
                        this.renderCount()
                    )
                );
            }
        }]);

        return TodoView;
    }(React.Component);

    app.TodoView = TodoView;
})(app);