describe('owl.history', function() {
    // Init stubs
    sinon.spy(window, 'addEventListener');
    sinon.spy(window, 'removeEventListener');
    describe('init', function() {
        before(function() {
            owl.history.init({
                baseUrl: '/base'
            });
        });
        it('should set options', function() {
            expect(owl.history.getOption('baseUrl')).to.be.deep.equal('/base');
        });
        after(function() {
            owl.history.init({
                baseUrl: '/'
            });
        });
    });
    describe('start', function() {
        before(function() {
            sinon.stub(owl.history, 'getLocation').returns('/something');
            sinon.stub(owl.history, 'open');
            owl.history.start();
        });
        it('should call getLocation', function() {
            expect(owl.history.getLocation()).to.be.deep.equal('/something');
        });
        it('should call open', function() {
            assert(owl.history.open.calledOnce);
        });
        it('should set started to true', function() {
            assert(owl.history.isStarted());
        });

        it('should add popstate event listener to window', function() {
            assert(window.addEventListener.calledWith('popstate'));
        });

        after(function() {
            owl.history.open.restore();
            owl.history.getLocation.restore();
        });
    });
    describe('stop', function() {
        before(function() {
            owl.history.stop();
        });
        it('should remove popstate event listener from window', function() {
            assert(window.removeEventListener.calledWith('popstate'));
        });
    });

    describe('navigate', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            window.history.pushState = sinon.spy();
            owl.history.navigate('something');
        });
        it('should navigate to the path', function() {
            assert(window.history.pushState.calledWith(null, null, '/something'));
        });
        it('should open the path', function() {
            assert(owl.history.open.calledWith('something'));
        });
        after(function() {
            owl.history.open.restore();
            owl.history.pushState = null;
        });
    });

    describe('navigate (with base path)', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            window.history.pushState = sinon.spy();
            owl.history.init({
                baseUrl: '/',
                basePath: 'something'
            });
            owl.history.navigate('something');
        });

        it('should navigate to the path', function() {
            assert(window.history.pushState.calledWith(null, null, '/something'));
        });

        it('should open the path', function() {
            assert(owl.history.open.calledWith('something'));
        });

        after(function() {
            owl.history.open.restore();
            owl.history.pushState = null;
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
    });


    describe('navigate (with not matching base path)', function() {
        before(function() {
            sinon.stub(window.location, 'assign');
            owl.history.init({
                baseUrl: '/',
                basePath: 'something-else'
            });
            owl.history.navigate('something');
        });

        it('should navigate to the path', function() {
            assert(window.location.assign.calledWith('/something'));
        });

        after(function() {
            window.location.assign.restore();
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
    });

    describe('replace', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            window.history.replaceState = sinon.spy();
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
            owl.history.replace('something');
        });

        it('should replace the state', function() {
            assert(window.history.replaceState.calledWith(null, null, '/something'));
        });

        it('should open the path', function() {
            assert(owl.history.open.calledWith('something'));
        });

        after(function() {
            owl.history.open.restore();
            window.history.replaceState = null;
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
    });

    describe('replace (with base path)', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            window.history.replaceState = sinon.spy();
            owl.history.init({
                baseUrl: '/',
                basePath: 'something'
            });
            owl.history.replace('something');
        });

        it('should replace the path', function() {
            assert(window.history.replaceState.calledWith(null, null, '/something'));
        });

        it('should open the path', function() {
            assert(owl.history.open.calledWith('something'));
        });

        after(function() {
            owl.history.open.restore();
            owl.history.replaceState = null;
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
    });


    describe('replace (with not matching base path)', function() {
        before(function() {
            sinon.stub(window.location, 'replace');
            owl.history.init({
                baseUrl: '/',
                basePath: 'something-else'
            });
            owl.history.replace('something');
        });

        it('should replace the path', function() {
            assert(window.location.replace.calledWith('/something'));
        });

        after(function() {
            window.location.replace.restore();
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
    });

    describe('getLocation', function() {
        before(function() {
            owl.history.init({
                baseUrl: '/',
                basePath: ''
            });
        });
        it('should get the location', function() {
            expect(owl.history.getLocation()).to.be.equal('context.html');
        });
    });
    describe('getHash and setHash', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            owl.history.setHash('something');
        });
        it('set the hash', function() {
            expect(owl.history.getHash()).to.be.deep.equal('something');
        });
        after(function() {
            owl.history.open.restore();
        });
    });
    describe('open (default router)', function() {
        var customRouter = new owl.Router();
        var router = new owl.Router();
        var destroyer = sinon.spy();
        before(function() {
            sinon.stub(router, 'open').returns(owl.Promise.resolve(destroyer));
            sinon.stub(owl.history, 'trigger');

            owl.history.setRouter('/something', customRouter);
            owl.history.setDefaultRouter(router);
            return owl.history.open('/somethingOther');
        });
        it('should trigger change event', function() {
            assert(owl.history.trigger.calledWith('change'));
        });
        it('should open router page', function() {
            assert(router.open.calledWith('somethingOther'));
        });
        it('should call destroyer on opening again', function () {
            return owl.history.open('/somethingOther').then(function () {
                assert(destroyer.calledOnce)
            })
        });
        after(function() {
            owl.history.trigger.restore();
            owl.history.removeRouter('/something');
            owl.history.setDefaultRouter(null);
        });
    });
    describe('open (default router is not defined)', function() {
        before(function() {
            sinon.stub(owl.history, 'trigger');
            sinon.stub(console, 'log');

            owl.history.open('/somethingOther');
        });
        it('should not trigger change event', function() {
            assert(owl.history.trigger.notCalled);
        });
        after(function() {
            owl.history.trigger.restore();
            console.log.restore();
        });
    });
    describe('open (custom router)', function() {
        var router = new owl.Router();
        var close = sinon.spy();
        before(function() {
            sinon.stub(router, 'open').returns(Promise.resolve(close()));
            sinon.stub(owl.history, 'trigger');

            owl.history.setRouter('something', router);
            owl.history.open('/something/else');
            owl.history.open('/something/other');
        });
        it('should trigger change event', function() {
            assert(owl.history.trigger.calledWith('change'));
        });
        it('should open router page', function() {
            assert(router.open.calledWith('/else'));
        });
        it('should close previous page', function() {
            assert(close.called);
        });
        after(function() {
            owl.history.trigger.restore();
        });
    });
    describe('setRouter', function() {
        var router = new owl.Router();
        before(function() {
            owl.history.setRouter('/something', router);
        });
        it('should trigger change event', function() {
            expect(owl.history.getRouter('/something')).to.be.deep.equal(router);
        });
    });
    describe('removeRouter', function() {
        var router = new owl.Router();
        before(function() {
            owl.history.setRouter('/something', router);
            owl.history.removeRouter('/something');
        });
        it('should trigger change event', function() {
            expect(owl.history.getRouter('/something')).to.be.deep.equal(undefined);
        });
    });
    describe('setDefaultRouter', function() {
        var router = new owl.Router();
        before(function() {
            owl.history.setDefaultRouter(router);
        });
        it('should trigger change event', function() {
            expect(owl.history.getDefaultRouter()).to.be.deep.equal(router);
        });
    });
    describe('setResolve', function() {
        var resolve = sinon.spy();
        before(function() {
            owl.history.setResolve('something', resolve);
        });
        it('should set resolve', function() {
            expect(owl.history.getResolve('something')).to.be.deep.equal(resolve);
        });
    });
    describe('removeResolve', function() {
        var resolve = sinon.spy();
        before(function() {
            owl.history.setResolve('something', resolve);
            owl.history.removeResolve('something');
        });
        it('should remove resolve', function() {
            expect(owl.history.getResolve('something')).to.be.deep.equal(undefined);
        });
    });
    describe('on', function() {
        var listener = sinon.spy();
        before(function() {
            owl.history.on('change', listener);
            owl.history.trigger('change');
        });
        it('should call listener', function() {
            assert(listener.calledOnce);
        });
        after(function() {
            owl.history.off('change', listener);
        });
    });
    describe('off', function() {
        var listener = sinon.spy();
        before(function() {
            owl.history.on('change', listener);
            owl.history.off('change', function() {});
            owl.history.off('change', listener);
            owl.history.off('something', listener);
            owl.history.trigger('change');
        });
        it('should not call listener', function() {
            assert(listener.notCalled);
        });
        after(function() {
            owl.history.off('change', listener);
        });
    });
});