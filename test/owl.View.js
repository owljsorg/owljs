describe('owl.View.js', function() {
    describe('init', function() {
        var view = new owl.View({
            className: 'something',
            events: {
                'click span': 'clickSpan',
                'click $element': 'clickElement',
                'submit form': 'submit'
            },
            template: function() {
                return '<span>something</span>'
            }
        });
        view.click = sinon.spy();
        view.render();
        it('should set the class to the element', function() {
            expect(view.getEl().className).to.be.equal('something');
        });
    });
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
    describe('remove', function() {
        var view = new owl.View({
            template: function() {
                return '<span>something</span>'
            }
        });
        view.render();
        it('should reset innerHTML of the element', function() {
            view.remove();
            expect(view.getEl().innerHTML).to.be.equal('');
        });
    });
    describe('find', function() {
        var view = new owl.View({
            template: function() {
                return '<span>something</span>'
            }
        });
        view.render();
        before(function() {
            sinon.stub(view.getEl(), 'querySelector');
        });
        it('should trigger event and sub events', function () {
            view.find('something');
            assert(view.getEl().querySelector.calledWith('something'));
        });
        after(function() {
            view.getEl().querySelector.restore();
        });
    });
    describe('find', function() {
        var view = new owl.View({
            template: function() {
                return '<span>something</span>'
            }
        });
        view.render();
        before(function() {
            sinon.stub(view.getEl(), 'querySelectorAll');
        });
        it('should trigger event and sub events', function () {
            view.findAll('something');
            assert(view.getEl().querySelectorAll.calledWith('something'));
        });
        after(function() {
            view.getEl().querySelectorAll.restore();
        });
    });
});