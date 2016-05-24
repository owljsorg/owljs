describe('owl.Controller', function() {
    var controller = new owl.Controller();
    describe('init', function() {
        it('should define destroy function', function() {
            expect(controller.destroy).to.be.a('function');
        });
    });

});
