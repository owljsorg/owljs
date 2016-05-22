'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (app, owl) {
    var TodoController = function () {
        function TodoController() {
            var _this = this;

            _classCallCheck(this, TodoController);

            this.appView = owl.require('appView');
            this.todoItemCollection = new app.TodoItemCollection();
            this.todoItemCollection.on('change', function () {
                _this.showTodoView();
            });
        }

        _createClass(TodoController, [{
            key: 'readAll',
            value: function readAll() {
                this.todoItemCollection.fetch();
            }
        }, {
            key: 'showTodoView',
            value: function showTodoView() {
                this.appView.show(React.createElement(app.TodoView, {
                    controller: this,
                    items: this.todoItemCollection
                }));
            }
        }, {
            key: 'addItem',
            value: function addItem(title) {
                var _this2 = this;

                var todoItem = new app.TodoItemModel({
                    title: title,
                    isDone: false
                });
                todoItem.save().then(function () {
                    _this2.todoItemCollection.fetch();
                });
            }
        }, {
            key: 'setDone',
            value: function setDone(index, value) {
                this.todoItemCollection.get(index).patch({
                    isDone: value
                });
            }
        }]);

        return TodoController;
    }();

    app.TodoController = TodoController;
})(app, owl);