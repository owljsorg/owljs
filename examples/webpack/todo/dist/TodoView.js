'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (app, owl) {
    var TodoView = function (_owl$View) {
        _inherits(TodoView, _owl$View);

        function TodoView(options) {
            _classCallCheck(this, TodoView);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoView).call(this, {
                className: 'v-todo',
                // you can use any template engine here
                template: function template() {
                    return '<form>' + '<h1>Todo list</h1>' + '<input type="text" data-element="title" placeholder="Add a task" />' + '<div data-element="counter" class="v-todo--counter"></div>' + '</form>' + '<div data-element="items"></div>' + '<div data-element="count"></div>';
                },
                events: {
                    'keyup $title': 'keyup',
                    'submit form': 'submit'
                },
                collection: options.collection
            }));

            _this.templateCount = function (data) {
                return '<div class="v-todo--count">' + data.countLeft + ' items left' + '</div>';
            };
            // update links to data-element
            // and update special events (submit, focus, blur)
            _this.render();
            _this.initListeners();
            return _this;
        }

        _createClass(TodoView, [{
            key: 'render',
            value: function render() {
                this.el.innerHTML = this.template();
                this.update();
                this.renderItems();
                this.renderCount();
            }
        }, {
            key: 'renderItems',
            value: function renderItems() {
                var _this2 = this;

                var items = this.collection.getModels();
                this.elements.items.innerHTML = '';
                items.forEach(function (model) {
                    var todoItemView = new app.TodoItemView({
                        model: model
                    });
                    _this2.elements.items.appendChild(todoItemView.getEl());
                });
            }
        }, {
            key: 'renderCount',
            value: function renderCount() {
                var countLeft = 0;
                this.collection.getModels().forEach(function (model) {
                    if (!model.get('isDone')) {
                        countLeft++;
                    }
                });
                this.elements.count.innerHTML = this.templateCount({
                    countLeft: countLeft
                });
            }
        }, {
            key: 'initListeners',
            value: function initListeners() {
                var _this3 = this;

                this.collection.on('change', function () {
                    _this3.renderItems();
                    _this3.renderCount();
                });
            }
        }, {
            key: 'submit',
            value: function submit(element, event) {
                var _this4 = this;

                var todoItem;
                event.preventDefault();
                todoItem = new app.TodoItemModel({
                    title: this.elements.title.value,
                    isDone: false
                });
                todoItem.save().then(function () {
                    _this4.collection.fetch();
                });
                this.elements.title.value = '';
            }
        }, {
            key: 'keyup',
            value: function keyup(element) {
                this.elements.counter.innerHTML = element.value.length.toString() || '';
            }
        }]);

        return TodoView;
    }(owl.View);

    app.TodoView = TodoView;
})(app, owl);