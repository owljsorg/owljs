describe('owl.js', function() {
    describe('require and define', function() {
        var object = {
            something: 'else'
        };
        var callback = sinon.stub().returns(object);
        before(function() {
            owl.define('something', callback);
        });
        it('should call callback', function() {
            owl.require('something');
            assert(callback.calledOnce);
        });
        it('should return the object', function() {
            expect(owl.require('something')).to.be.deep.equal(object);
        });
    });
});