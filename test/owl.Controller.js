describe('owl.Controller', function() {
    var controller = new owl.Controller();
    describe('init', function() {
        it('should define init function', function() {
            expect(controller.init).to.be.a('function');
        });
        it('should define destroy function', function() {
            expect(controller.destroy).to.be.a('function');
        });
    });

});
