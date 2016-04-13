describe('owl.history', function() {
    // Init stubs
    sinon.stub(owl.history, 'getLocation').returns('/something');
    sinon.stub(owl.history, 'open');
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
            owl.history.open.reset();
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
            owl.history.navigate('/something');
        });
        it('open the path', function() {
            assert(owl.history.open.calledWith('/something'));
        });
        after(function() {
            owl.history.open.reset();
        });
    });
    describe('replace', function() {
        before(function() {
            owl.history.replace('/something');
        });
        it('open the path', function() {
            assert(owl.history.open.calledWith('/something'));
        });
        after(function() {
            owl.history.open.reset();
        });
    });
});