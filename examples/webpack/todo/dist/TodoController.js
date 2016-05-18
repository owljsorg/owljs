'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (app, owl) {
    var TodoController = function () {
        function TodoController() {
            _classCallCheck(this, TodoController);

            this.appView = owl.require('appView');
        }

        _createClass(TodoController, [{
            key: 'readAll',
            value: function readAll() {
                var _this = this;

                var todoItemCollection = void 0,
                    todoView = void 0;

                todoItemCollection = new app.TodoItemCollection();
                todoItemCollection.fetch().then(function () {
                    todoView = new app.TodoView({
                        controller: _this,
                        collection: todoItemCollection
                    });

                    _this.appView.showMain(todoView);
                });
            }
        }]);

        return TodoController;
    }();

    app.TodoController = TodoController;
})(app, owl);