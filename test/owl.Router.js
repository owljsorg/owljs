describe('owl.Router.js', function() {
    describe('init', function() {
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        var defaultRoute = {
            callback: sinon.spy()
        };
        var controller = {
            action: sinon.spy()
        };
        var router = new owl.Router([
            route
        ], defaultRoute, controller);
        it('should set route', function() {
            expect(router.getRoute('/something').path).to.be.deep.equal(route.path);
        });
        it('should set default route', function() {
            expect(router.getDefaultRoute()).to.be.deep.equal(defaultRoute);
        });
        it('should set controller', function() {
            expect(router.getController()).to.be.deep.equal(controller);
        });
    });
    describe('init (no default router)', function() {
        var router = new owl.Router();
        before(function() {
            sinon.stub(console, 'log');
        });
        it('should have default route', function() {
            expect(router.getDefaultRoute().callback).to.be.a('function');
        });
        it('should log some stuff when default callback called', function() {
            router.getDefaultRoute().callback();
            assert(console.log.called);
        });
        after(function() {
            console.log.restore();
        });
    });
    describe('open', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        before(function() {
            sinon.stub(router, 'getRoute').returns(route);
            sinon.stub(router, 'resolve').returns(true);
            sinon.stub(router, 'run');
            router.open('/something');
        });
        it('should get the route', function() {
            assert(router.getRoute.calledWith('/something'));
        });
        it('should resolve the route', function() {
            assert(router.resolve.calledWith(route));
        });
        it('should run the route', function() {
            assert(router.run.calledWith('/something', route));
        });
    });
    describe('open (one of resolves is not resolved)', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        before(function() {
            sinon.stub(router, 'getRoute').returns(route);
            sinon.stub(router, 'resolve').returns(false);
            sinon.stub(router, 'run');
            router.open('/something');
        });
        it('should get the route', function() {
            assert(router.getRoute.calledWith('/something'));
        });
        it('should resolve the route', function() {
            assert(router.resolve.calledWith(route));
        });
        it('should run the route', function() {
            assert(router.run.notCalled);
        });
    });
    describe('open (route is not defined)', function() {
        var router = new owl.Router();
        before(function() {
            sinon.stub(router, 'getRoute').returns(null);
            sinon.stub(router, 'resolve').returns(false);
            sinon.stub(router, 'run');
            router.open('/something');
        });
        it('should not resolve the route', function() {
            assert(router.resolve.notCalled);
        });
        it('should not run the route', function() {
            assert(router.run.notCalled);
        });
    });
    describe('run (controller is not defined)', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        before(function() {
            router.run('/something', route);
        });
        it('should run callback', function() {
            assert(route.callback.calledOnce);
        });
    });
    describe('run (controller is not defined and path has regexp)', function() {
        var router = new owl.Router();
        var route = {
            path: '/something/:id',
            regexp: /^\/something\/([^/]*)$/,
            params: ['id'],
            callback: sinon.spy()
        };
        it('should run callback when url matches route', function() {
            router.run('/something/123', route);
            assert(route.callback.calledOnce);
        });
        it('should not callback even when url not matches route', function() {
            router.run('/something', route);
            assert(route.callback.calledTwice);
        });
    });
    describe('run (controller defined but action is missing in controller)', function() {
        var router = new owl.Router();
        var controller = {
            action: sinon.spy()
        };
        var route = {
            path: '/something',
            controller: controller,
            action: 'something'
        };
        before(function() {
            sinon.stub(console, 'info');
            sinon.stub(owl, 'require').returns({});
        });
        it('should leave message in the log', function() {
            router.run('/something', route);
            assert(console.info.calledOnce);
        });
        after(function() {
            console.info.restore();
            owl.require.restore();
        });
    });
    describe('run (callback is not defined)', function() {
        var router = new owl.Router();
        var route = {
            path: '/something'
        };
        before(function() {
            sinon.stub(console, 'error');
        });
        it('should leave message in the log', function() {
            router.run('/something', route);
            assert(console.error.calledOnce);
        });
        after(function() {
            console.error.restore();
        });
    });
    describe('run (global controller and local action are defined)', function() {
        var router = new owl.Router();
        var controller = {
            action: sinon.spy()
        };
        router.setController(controller);
        var route = {
            path: '/something',
            action: 'action'
        };
        before(function() {
            sinon.stub(owl, 'require').returns(controller);
            router.run('/something', route);
        });
        it('should run controller action', function() {
            assert(controller.action.calledOnce);
        });
        after(function() {
            owl.require.restore();
        });
    });
    describe('run (local controller and action are defined)', function() {
        var router = new owl.Router();
        var controller = {
            action: sinon.spy()
        };
        var route = {
            path: '/something',
            controller: controller,
            action: 'action'
        };
        before(function() {
            sinon.stub(owl, 'require').returns(controller);
            router.run('/something', route);
        });
        it('should run controller action', function() {
            assert(controller.action.calledOnce);
        });
        after(function() {
            owl.require.restore();
        });
    });
    describe('resolve', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy(),
            resolves: ['first', 'second', 'third']
        };
        var firstResolve = sinon.stub().returns(true);
        var secondResolve = sinon.stub().returns(true);
        before(function() {
            var getResolve = sinon.stub(owl.history, 'getResolve');
            getResolve.withArgs('first').returns(firstResolve);
            getResolve.withArgs('second').returns(secondResolve);
            sinon.stub(console, 'info');
            router.resolve(route);
        });
        it('should run callback', function() {
            assert(firstResolve.calledOnce);
            assert(secondResolve.calledOnce);
        });
        after(function() {
            owl.history.getResolve.restore();
            console.info.restore();
        });
    });
    describe('resolve (no resolves)', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        var firstResolve = sinon.stub().returns(true);
        before(function() {
            var getResolve = sinon.stub(owl.history, 'getResolve');
            getResolve.withArgs('first').returns(firstResolve);
            sinon.stub(console, 'info');
            router.resolve(route);
        });
        it('should run callback', function() {
            assert(firstResolve.notCalled);
        });
        after(function() {
            owl.history.getResolve.restore();
            console.info.restore();
        });
    });
    describe('addRoute', function() {
        var router = new owl.Router();
        var route = {
            path: '/something/:id',
            callback: sinon.spy()
        };
        var defaultRoute = {
            callback: sinon.spy()
        };
        before(function() {
            router.addRoute(route);
            router.setDefaultRoute(defaultRoute);
        });
        it('should run controller action', function() {
            expect(router.getRoute('/something/123').path).to.be.deep.equal(route.path);
            expect(router.getRoute('/something')).to.be.equal(defaultRoute);
        });
    });
    describe('setDefaultRoute', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        router.setDefaultRoute(route);
        it('should run controller action', function() {
            expect(router.getRoute('/something').path).to.be.deep.equal(route.path);
        });
    });
});
