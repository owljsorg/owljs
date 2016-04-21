describe('owl.View.js', function() {
    describe('update', function() {
        var view = new owl.View();
        before(function() {
            sinon.stub(view, 'updateEvents');
            sinon.stub(view, 'updateElements');
        });
        it('should update events', function() {
            view.update();
            assert(view.updateEvents.calledOnce);
        });
        after(function() {
            view.updateEvents.restore();
            view.updateElements.restore();
        });
    });
});