describe('owl.Model.js', function() {
    var thing = { id: 1, name: 'Nexus 5' };
    var newThing = { name: 'Nexus 5' };
    describe('get and set', function() {
        var model = new owl.Model(null, {
            defaults: {
                somethingElse: 'other'
            }
        });
        before(function() {
            model.set('something', 'else');
        });
        it('should get the internal value', function() {
            expect(model.get('something')).to.be.equal('else');
        });
        it('should get the default value if value is not defined', function() {
            expect(model.get('somethingElse')).to.be.equal('other');
        });
    });
    describe('fetch', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl, 'ajax').returns(new Promise(function (resolve) {
                resolve(thing);
            }));
        });
        it('should make GET request', function(done) {
            model.fetch().then(function() {
                assert(owl.ajax.calledWith({
                    url: '/things',
                    type: 'GET'
                }));
                done();
            });
        });
        it('should set the internal value', function(done) {
            model.fetch().then(function(result) {
                expect(result).to.be.deep.equal(thing);
                expect(model.getData()).to.be.deep.equal(thing);
                done();
            });
        });
        after(function() {
            owl.ajax.restore();
        });
    });
    describe('clear', function() {
        var model = new owl.Model(newThing, {
            urlRoot: '/things'
        });
        before(function() {
            model.clear();
        });
        it('should clear data', function() {
            expect(model.getData()).to.be.deep.equal({});
        });
    });
    describe('save (create entry)', function() {
        var model = new owl.Model(newThing, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl, 'ajax').returns(new Promise(function(resolve) {
                resolve({
                    id: 2
                });
            }));
        });
        it('should make POST request to server', function(done) {
            model.save().then(function() {
                assert(owl.ajax.calledWithMatch({
                    url: '/things',
                    type: 'POST',
                    data: newThing
                }));

                done();
            });
        });
        it('should update the id', function(done) {
            model.save().then(function() {
                expect(model.get('id')).to.be.deep.equal(2);

                done();
            });
        });
        after(function() {
            owl.ajax.restore();
        });
    });
    describe('save (update entry)', function() {
        var model = new owl.Model(thing, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl, 'ajax').returns(new Promise(function(resolve) {
                resolve({});
            }));
        });
        it('should make PUT request to server', function(done) {
            model.save().then(function() {
                assert(owl.ajax.calledWithMatch({
                    url: '/things/1',
                    type: 'PUT',
                    data: thing
                }));

                done();
            });
        });
        after(function() {
            owl.ajax.restore();
        });
    });
    describe('update', function() {
        var model = new owl.Model({
            id: 2
        }, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(model, 'save').returns(new Promise(function(resolve) {
                resolve({});
            }));
        });
        it('should save the object', function() {
            model.update({
                name: 'something'
            });
            assert(model.save.calledOnce);
        });
        after(function() {
            model.save.restore();
        });
    });

    describe('update (id is not defined)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(console, 'warn').returns();
        });
        it('should reject update', function(done) {
            model.update({
                name: 'something'
            }).catch(function(error) {
                done();
            });
        });
        after(function() {
            console.warn.restore();
        });
    });
    describe('on and trigger', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        it('should trigger event', function () {
            model.triggerSingle('event');

            assert(firstListener.calledOnce);
            assert(secondListener.calledOnce);
        });
    });
    describe('off', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.off('event', firstListener);
        model.off('otherEvent', secondListener);
        it('should trigger event', function () {
            model.triggerSingle('event');

            assert(firstListener.notCalled);
            assert(secondListener.notCalled);
        });
    });
});