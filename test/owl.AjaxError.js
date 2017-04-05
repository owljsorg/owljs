describe('owl.AjaxError', function() {
    var xhr = new XMLHttpRequest();
    var error = new owl.AjaxError(xhr);

    describe('getMessage', function() {
        it('should get message', function() {
            expect(error.getMessage()).to.eql('Respond with 0');
        });
    });

    describe('getStatus', function() {
        it('should get status', function() {
            expect(error.getStatus()).to.eql(0);
        });
    });

    describe('getText', function() {
        it('should get text', function() {
            expect(error.getText()).to.eql('');
        });
    });

    describe('getData', function() {
        it('should get data', function() {
            expect(error.getData()).to.eql({});
        });
    });
});
