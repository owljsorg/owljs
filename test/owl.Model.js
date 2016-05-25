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
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve(thing);
            }));
        });
        it('should make GET request', function(done) {
            model.fetch().then(function() {
                assert(owl.ajax.request.calledWith({
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
            owl.ajax.request.restore();
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
            sinon.stub(owl.ajax, 'request').returns(new Promise(function(resolve) {
                resolve({
                    id: 2
                });
            }));
        });
        it('should make POST request to server', function(done) {
            model.save().then(function() {
                assert(owl.ajax.request.calledWithMatch({
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
            owl.ajax.request.restore();
        });
    });
    describe('save (update entry)', function() {
        var model = new owl.Model(thing, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function(resolve) {
                resolve({});
            }));
            sinon.stub(model, 'trigger');
        });
        it('should make PUT request to server', function(done) {
            model.save().then(function() {
                assert(owl.ajax.request.calledWithMatch({
                    url: '/things/1',
                    type: 'PUT',
                    data: thing
                }));

                done();
            });
        });
        it('should trigger change', function() {
            model.save().then(function() {
                assert(model.trigger.called);
                done();
            });
        });
        after(function() {
            model.trigger.restore();
            owl.ajax.request.restore();
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

    describe('patch', function() {
        var model = new owl.Model({
            id: 2
        }, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({});
            }));
            sinon.stub(model, 'trigger');
        });
        it('should send PATCH request', function(done) {
            model.patch({
                key: 'value'
            }).then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things/2',
                    type: 'PATCH',
                    data: {
                        key: 'value'
                    }
                }));
                done();
            });
        });
        it('should trigger change event', function(done) {
            model.patch({
                key: 'value'
            }).then(function() {
                assert(model.trigger.calledWith('change'));
                done();
            });
        });
        after(function() {
            owl.ajax.request.restore();
            model.trigger.restore();
        });
    });

    describe('patch (id is not defined)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(console, 'warn').returns();
        });
        it('should reject patch', function(done) {
            model.patch({
                name: 'something'
            }).catch(function(error) {
                done();
            });
        });
        after(function() {
            console.warn.restore();
        });
    });

    describe('destroy', function() {
        var model = new owl.Model({
            id: 2
        }, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({});
            }));
            sinon.stub(model, 'clear');
        });
        it('should send DELETE request', function(done) {
            model.destroy().then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things/2',
                    type: 'DELETE'
                }));
                done();
            });
        });
        it('should clear the model', function(done) {
            model
            .destroy()
            .then(function() {
                assert(model.clear.called);
                done();
            });
        });
        after(function() {
            owl.ajax.request.restore();
            model.clear.restore();
        });
    });

    describe('destroy (id is not defined)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(console, 'warn').returns();
        });
        it('should reject patch', function(done) {
            model
            .destroy()
            .catch(function() {
                done();
            });
        });
        after(function() {
            console.warn.restore();
        });
    });

    describe('setData', function() {
        var data = {
            id: 3,
            something: 'else'
        };
        var model = new owl.Model({
            id: 2
        }, {
            urlRoot: '/things'
        });
        sinon.spy(model, 'updateCollection');
        sinon.spy(model, 'trigger');
        it('should set data to the model', function() {
            model.setData(data);
            expect(model.getData()).to.be.equal(data)
        });
        it('should update collection', function() {
            assert(model.updateCollection.called);
        });
        it('should update collection', function() {
            assert(model.trigger.calledWith('change'));
        });
    });

    describe('getCollectionIndex', function() {
        var model = new owl.Model({
            id: 2,
        }, {
            urlRoot: '/things',
            collectionIndex: 1
        });
        it('should get collection index', function() {
            expect(model.getCollectionIndex()).to.be.equal(1)
        });
    });

    describe('triggerSingle', function() {
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

    describe('triggerSingle (when collection defined)', function() {
        var collection = new owl.Collection([], {
            url: ''
        });
        var model = new owl.Model({}, {
            urlRoot: '/things',
            collection: collection
        });
        before(function() {
            sinon.stub(collection, 'trigger');
        });
        it('should trigger event', function () {
            model.triggerSingle('event');
            assert(collection.trigger.called);
        });
        after(function() {
            collection.trigger.restore();
        });
    });
    describe('off', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        var thirdListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        model.off('event', firstListener);
        model.off('otherEvent', thirdListener);
        it('should trigger right event', function () {
            model.triggerSingle('event');

            assert(firstListener.notCalled);
            assert(secondListener.called);
            assert(thirdListener.notCalled);
        });
    });

    describe('off (without listener)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        model.off('event');
        it('should not trigger event', function () {
            model.triggerSingle('event');

            assert(secondListener.notCalled);
            assert(firstListener.notCalled);
        });
    });

    describe('off (without event)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.on('otherEvent', secondListener);
        model.off();
        it('should not trigger event', function () {
            model.triggerSingle('event');
            model.triggerSingle('otherEvent');

            assert(secondListener.notCalled);
            assert(firstListener.notCalled);
        });
    });

    describe('trigger', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(model, 'triggerSingle');
        });
        it('should trigger event', function () {
            model.trigger('event');
            assert(model.triggerSingle.calledWith('event'));
        });
        after(function() {
            model.triggerSingle.restore();
        });
    });

    describe('trigger (with sub events)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(model, 'triggerSingle');
        });
        it('should trigger event and sub events', function () {
            model.trigger('event', ['event1', 'event2']);
            assert(model.triggerSingle.calledWith('event'));
            assert(model.triggerSingle.calledWith('event:event1'));
            assert(model.triggerSingle.calledWith('event:event2'));
        });
        after(function() {
            model.triggerSingle.restore();
        });
    });
});