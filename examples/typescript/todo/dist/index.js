var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView() {
            _super.call(this, {
                el: document.querySelector('html')
            });
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.update();
        }
        AppView.prototype.showMain = function (view) {
            this.elements.main.style.display = 'block';
            this.elements.error.style.display = 'none';
            this.elements.main.innerHTML = '';
            this.elements.main.appendChild(view.getEl());
        };
        AppView.prototype.showError = function () {
            this.elements.main.style.display = 'none';
            this.elements.error.style.display = 'block';
        };
        return AppView;
    }(owl.View));
    app.AppView = AppView;
})(app || (app = {}));
var app;
(function (app) {
    var MainRouter = (function (_super) {
        __extends(MainRouter, _super);
        function MainRouter() {
            var todoController = owl.require('todoController'), routes = [{
                    path: '',
                    action: 'readAll'
                }, {
                    path: 'item/:id',
                    callback: function () {
                        console.log('user');
                    }
                }], defaultRoute = {
                callback: function () {
                    console.log('404 page');
                }
            };
            _super.call(this, routes, defaultRoute, todoController);
        }
        return MainRouter;
    }(owl.Router));
    app.MainRouter = MainRouter;
})(app || (app = {}));
var app;
(function (app) {
    var TodoController = (function () {
        function TodoController() {
            this.appView = owl.require('appView');
        }
        TodoController.prototype.readAll = function () {
            var _this = this;
            var todoItemCollection, todoView;
            todoItemCollection = new app.TodoItemCollection();
            todoItemCollection.fetch().then(function () {
                todoView = new app.TodoView({
                    controller: _this,
                    collection: todoItemCollection
                });
                _this.appView.showMain(todoView);
            });
        };
        return TodoController;
    }());
    app.TodoController = TodoController;
})(app || (app = {}));
var app;
(function (app) {
    var TodoItemModel = (function (_super) {
        __extends(TodoItemModel, _super);
        function TodoItemModel(data, options) {
            _super.call(this, data, {
                urlRoot: 'todo/items',
                collection: options && options.collection
            });
        }
        return TodoItemModel;
    }(owl.Model));
    app.TodoItemModel = TodoItemModel;
})(app || (app = {}));
var app;
(function (app) {
    var TodoItemCollection = (function (_super) {
        __extends(TodoItemCollection, _super);
        function TodoItemCollection(data) {
            _super.call(this, data, {
                url: 'todo/items',
                model: app.TodoItemModel
            });
        }
        return TodoItemCollection;
    }(owl.Collection));
    app.TodoItemCollection = TodoItemCollection;
})(app || (app = {}));
var app;
(function (app) {
    var TodoView = (function (_super) {
        __extends(TodoView, _super);
        function TodoView(options) {
            _super.call(this, {
                className: 'v-todo',
                // you can use any template engine here
                template: function () {
                    return ('<form>' +
                        '<h1>Todo list</h1>' +
                        '<input type="text" data-element="title" placeholder="Add a task" />' +
                        '<div data-element="counter" class="v-todo--counter"></div>' +
                        '</form>' +
                        '<div data-element="items"></div>' +
                        '<div data-element="count"></div>');
                },
                events: {
                    'keyup $title': 'keyup',
                    'submit form': 'submit'
                },
                collection: options.collection
            });
            this.templateCount = function (data) {
                return ('<div class="v-todo--count">' +
                    data.countLeft + ' items left' +
                    '</div>');
            };
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.render();
            this.initListeners();
        }
        TodoView.prototype.render = function () {
            this.el.innerHTML = this.template();
            this.update();
            this.renderItems();
            this.renderCount();
        };
        TodoView.prototype.renderItems = function () {
            var _this = this;
            var items = this.collection.getModels();
            this.elements.items.innerHTML = '';
            items.forEach(function (model) {
                var todoItemView = new app.TodoItemView({
                    model: model
                });
                _this.elements.items.appendChild(todoItemView.getEl());
            });
        };
        TodoView.prototype.renderCount = function () {
            var countLeft = 0;
            this.collection.getModels().forEach(function (model) {
                if (!model.get('isDone')) {
                    countLeft++;
                }
            });
            this.elements.count.innerHTML = this.templateCount({
                countLeft: countLeft
            });
        };
        TodoView.prototype.initListeners = function () {
            var _this = this;
            this.collection.on('change', function () {
                _this.renderItems();
                _this.renderCount();
            });
        };
        TodoView.prototype.submit = function (element, event) {
            var _this = this;
            var todoItem;
            event.preventDefault();
            todoItem = new app.TodoItemModel({
                title: this.elements.title.value,
                isDone: false
            });
            todoItem.save().then(function () {
                _this.collection.fetch();
            });
            this.elements.title.value = '';
        };
        TodoView.prototype.keyup = function (element) {
            this.elements.counter.innerHTML = element.value.length.toString() || '';
        };
        ;
        return TodoView;
    }(owl.View));
    app.TodoView = TodoView;
})(app || (app = {}));
var app;
(function (app) {
    var TodoItemView = (function (_super) {
        __extends(TodoItemView, _super);
        function TodoItemView(options) {
            _super.call(this, {
                className: 'v-todo',
                // you can use any template engine here
                template: function (data) {
                    return ('<label class="checkbox">' +
                        '<input data-element="checkbox" type="checkbox" ' + (data.isDone ? 'checked="checked"' : '') + ' />' +
                        '<span>' + data.title + '</span>' +
                        '</label>');
                },
                events: {
                    'change $checkbox': 'change'
                },
                model: options.model
            });
            // update links to data-element
            // and update special events (submit, focus, blur)
            this.render();
            this.initListeners();
        }
        TodoItemView.prototype.render = function () {
            this.el.innerHTML = this.template(this.model.getData());
            this.update();
        };
        ;
        TodoItemView.prototype.change = function (element, event) {
            event.preventDefault();
            this.model.patch({
                isDone: element.checked
            });
        };
        ;
        TodoItemView.prototype.initListeners = function () {
            var _this = this;
            this.model.on('change', function () {
                _this.render();
            });
        };
        ;
        return TodoItemView;
    }(owl.View));
    app.TodoItemView = TodoItemView;
})(app || (app = {}));
///<reference path="../../../../typescript/owl.d.ts"/>
///<reference path="AppView.ts"/>
///<reference path="MainRouter.ts"/>
///<reference path="TodoController.ts"/>
///<reference path="TodoItemModel.ts"/>
///<reference path="TodoItemCollection.ts"/>
///<reference path="TodoView.ts"/>
///<reference path="TodoItemView.ts"/>
document.addEventListener('DOMContentLoaded', function () {
    owl.define('appView', function () {
        return new app.AppView();
    });
    owl.define('todoController', function () {
        return new app.TodoController();
    });
    owl.history.init({
        baseUrl: '/typescript/todo/'
    });
    owl.history.setDefaultRouter(new app.MainRouter());
    owl.history.start();
});
