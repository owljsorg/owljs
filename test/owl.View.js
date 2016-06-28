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
                return '<span>something</span>';
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
            view.update();
        });
        it('should update events', function() {
            assert(view.updateEvents.calledOnce);
        });
        it('should update elements', function() {
            assert(view.updateElements.calledOnce);
        });
        after(function() {
            view.updateEvents.restore();
            view.updateElements.restore();
        });
    });
    describe("updateElements", function () {
        var view = new owl.View(),
        selectedElement=function(attr,name){
            return {
                getAttribute:sinon.stub().withArgs(attr).returns(name)
            };
        };

        before(function() {
            sinon.stub(view.getEl(), 'querySelectorAll')
            .withArgs('[data-element]').returns([selectedElement('data-element','one element')])
            .withArgs('[data-elements]').returns([selectedElement('data-element','more element')]);
        });
        it("should add data element and data elements when updated", function () {
            view.updateElements(view.getEl());
            assert.isObject(view.elements['one element']);
            assert.isArray(view.elements['more element']);
        });

        afterEach(function () {
            view.getEl().querySelectorAll.restore();
        });
    });
    describe('remove', function() {
        var view = createSimpleMockView();
        view.render();
        it('should reset innerHTML of the element', function() {
            view.remove();
            expect(view.getEl().innerHTML).to.be.equal('');
        });
    });
    describe('find', function() {
        var view = createSimpleMockView();
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
        var view = createSimpleMockView();
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
    describe("getMatchingElement", function () {
        beforeEach(function () {
            polyfillMatch();
            view=new owl.View();
        });

        function createDataElement(flag){
            var el=window.document.createElement('span');
            el.setAttribute('data-element',flag);
            return el;
        }

        it("should return null if element is the same as the view.getEl", function () {
            assert.equal(null,view.getMatchingElement(view.getEl(),'div'));
        });

        it("should return element if selector matches", function () {
            var el=createDataElement('true');
            assert.equal(el,view.getMatchingElement(el,"[data-element='true']"));
        });
        it("should return null if selector doesn't match", function () {
            var el=createDataElement('true');
            assert.equal(null,view.getMatchingElement(el,"[deata-element='false']"));
        });
    });
    describe("callEventListener", function () {
        var view=new owl.View();
        before(function() {
            sinon.spy(console, 'error');
        });

        it("should call console error when method is undefined", function () {
            view.callEventListener('method', 'element', 'event');

            assert(console.error.calledOnce);
        });

        it("should call method with element and event if defined", function () {
            var spy = sinon.spy();
            view.spyMethod=spy;
            view.callEventListener('spyMethod','element','event');
            assert(spy.calledWithMatch('element','event'));
        });

        afterEach(function () {
            if(console.error.restore) console.error.restore();
        });
    });

    function createSimpleMockView(html){
        if(!html){
            html='<span>something</span>';
        }
        return new owl.View({
                template: function() {
                    return html;
                }
            });
    }

    function polyfillMatch(){
        //PhantomJS does not have matches property
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
        if (!Element.prototype.matches) {
            Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
        }
    }

});
