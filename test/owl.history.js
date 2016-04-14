describe('owl.history', function() {
    // Init stubs
    sinon.stub(owl.history, 'getLocation').returns('/something');
    sinon.stub(window, 'addEventListener');
    sinon.stub(window, 'removeEventListener');
    describe('init', function() {
        owl.history.init({
            baseUrl: '/api'
        });
        it('should set options', function() {
            expect(owl.history.getOption('baseUrl')).to.be.eql('/api');
        });
    });
    describe('start', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            owl.history.start();
        });
        it('should call getLocation', function() {
            expect(owl.history.getLocation()).to.be.eql('/something');
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
            owl.history.navigate('/something');
        });
        it('open the path', function() {
            assert(owl.history.open.calledWith('/something'));
        });
        after(function() {
            owl.history.open.restore();
        });
    });
    describe('replace', function() {
        before(function() {
            sinon.stub(owl.history, 'open');
            owl.history.replace('/something');
        });
        it('open the path', function() {
            assert(owl.history.open.calledWith('/something'));
        });
        after(function() {
            owl.history.open.restore();
        });
    });
    describe('getHash and setHash', function() {
        before(function() {
            owl.history.setHash('something');
        });
        it('set the hash', function() {
            expect(owl.history.getHash()).to.be.eql('something');
        });
    });
    describe('open (default router)', function() {
        var router = new owl.Router();
        before(function() {
            sinon.stub(router, 'open');
            sinon.stub(owl.history, 'trigger');

            owl.history.setDefaultRouter(router);
            owl.history.open('/something');
        });
        it('should trigger change event', function() {
            assert(owl.history.trigger.calledWith('change'));
        });
        it('should open router page', function() {
            assert(router.open.calledWith('/something'));
        });
        after(function() {
            owl.history.trigger.restore();
        });
    });
    describe('open (custom router)', function() {
        var router = new owl.Router();
        before(function() {
            sinon.stub(router, 'open');
            sinon.stub(owl.history, 'trigger');

            owl.history.setRouter('/something', router);
            owl.history.open('/something/else');
        });
        it('should trigger change event', function() {
            assert(owl.history.trigger.calledWith('change'));
        });
        it('should open router page', function() {
            assert(router.open.calledWith('/else'));
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
            expect(owl.history.getRouter('/something')).to.be.eql(router);
        });
    });
    describe('removeRouter', function() {
        var router = new owl.Router();
        before(function() {
            owl.history.setRouter('/something', router);
            owl.history.removeRouter('/something');
        });
        it('should trigger change event', function() {
            expect(owl.history.getRouter('/something')).to.be.eql(undefined);
        });
    });
    describe('setDefaultRouter', function() {
        var router = new owl.Router();
        before(function() {
            owl.history.setDefaultRouter(router);
        });
        it('should trigger change event', function() {
            expect(owl.history.getDefaultRouter()).to.be.eql(router);
        });
    });
    describe('setResolve', function() {
        var resolve = sinon.spy();
        before(function() {
            owl.history.setResolve('something', resolve);
        });
        it('should set resolve', function() {
            expect(owl.history.getResolve('something')).to.be.eql(resolve);
        });
    });
    describe('removeResolve', function() {
        var resolve = sinon.spy();
        before(function() {
            owl.history.setResolve('something', resolve);
            owl.history.removeResolve('something');
        });
        it('should remove resolve', function() {
            expect(owl.history.getResolve('something')).to.be.eql(undefined);
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
            owl.history.off('change', listener);
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