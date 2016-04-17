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
    describe('run (global controller and local action are defined)', function() {
        var router = new owl.Router();
        router.setController('controller');
        var route = {
            path: '/something',
            action: 'action'
        };
        var controller = {
            action: sinon.spy()
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
        var route = {
            path: '/something',
            controller: 'controller',
            action: 'action'
        };
        var controller = {
            action: sinon.spy()
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
    describe('addRoute', function() {
        var router = new owl.Router();
        var route = {
            path: '/something',
            callback: sinon.spy()
        };
        router.addRoute(route);
        it('should run controller action', function() {
            expect(router.getRoute('/something').path).to.be.deep.equal(route.path);
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
