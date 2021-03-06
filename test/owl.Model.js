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

    describe('getEndpointUrl', function() {
        var model = new owl.Model({
            alias: 'nexus5'
        }, {
            url: '/things/:alias'
        });
        it('should get endpoint url', function() {
            expect(model.getEndpointUrl()).to.be.equal('/things/nexus5');
        });
    });

    describe('getEndpointUrl (urlRoot - deprecated)', function() {
        var model = new owl.Model({
            alias: 'nexus5'
        }, {
            urlRoot: '/things',
            idAttribute: 'alias'
        });
        it('should get endpoint url', function() {
            expect(model.getEndpointUrl()).to.be.equal('/things/nexus5');
        });
    });

    describe('getEndpointUrl (urlRoot without idAttribute - deprecated)', function() {
        var model = new owl.Model({}, {
            urlRoot: '/things'
        });
        it('should get endpoint url', function() {
            expect(model.getEndpointUrl()).to.be.equal('/things');
        });
    });

    describe('fetch', function() {
        var model = new owl.Model({}, {
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({
                    data: thing,
                    status: 200,
                    headers: {}
                });
            }));
        });
        it('should make GET request', function(done) {
            model.fetch().then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things',
                    type: 'GET'
                }));
                done();
            }).catch(function(e) {
                console.log(e);
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

    describe('fetch (custom Id attribute)', function() {
        var model = new owl.Model({
            alias: 'nexus5'
        }, {
            url: '/things/:alias'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({
                    data: thing,
                    status: 200,
                    header: {}
                });
            }));
        });
        it('should make GET request', function(done) {
            model.fetch().then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things/nexus5',
                    type: 'GET'
                }));
                done();
            }).catch(function(e) {
                console.log(e);
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
            url: '/things/:id'
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
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function(resolve) {
                resolve({
                    data: {
                        id: 2
                    },
                    status: 200,
                    headers: {}
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
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function(resolve) {
                resolve({
                    data: {},
                    status: 200,
                    headers: {}
                });
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
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(model, 'save').returns(new Promise(function(resolve) {
                resolve({
                    data: {},
                    status: 200,
                    headers: {}
                });
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
            url: '/things'
        });
        before(function() {
            sinon.stub(model, 'save').returns(new Promise(function(resolve) {
                resolve({
                    data: {},
                    status: 200,
                    headers: {}
                });
            }));
        });
        it('should update a object', function(done) {
            model.update({
                name: 'something'
            }).then(function() {
                assert(model.save.calledOnce);

                done();
            });
        });
        after(function() {
            model.save.restore();
        });
    });

    describe('patch', function() {
        var model = new owl.Model({
            id: 2
        }, {
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({
                    data: {},
                    status: 200,
                    headers: {}
                });
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
        it('should send PATCH request with query', function(done) {
            model.patch({
                key: 'value'
            }, {
                type: 'something'
            }).then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things/2?type=something',
                    type: 'PATCH',
                    data: {
                        key: 'value'
                    }
                }));
                done();
            });
        });

        it('should send PATCH request with additional path', function(done) {
            model.patch({
                key: 'value'
            }, null, '/something').then(function() {
                assert(owl.ajax.request.calledWith({
                    url: '/things/2/something',
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

    describe('destroy', function() {
        var model = new owl.Model({
            id: 2
        }, {
            url: '/things/:id'
        });
        before(function() {
            sinon.stub(owl.ajax, 'request').returns(new Promise(function (resolve) {
                resolve({
                    data: {},
                    status: 200,
                    headers: {}
                });
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

    describe('setData', function() {
        var data = {
            id: 3,
            something: 'else'
        };
        var model = new owl.Model({
            id: 2
        }, {
            url: '/things/:id'
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
            url: '/things/:id',
            collectionIndex: 1
        });
        it('should get collection index', function() {
            expect(model.getCollectionIndex()).to.be.equal(1)
        });
    });

    describe('emit', function() {
        var model = new owl.Model({}, {
            url: '/things/:id'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        it('should emit event', function (done) {
            model.emit('event', 'value');

            setTimeout(function() {
                assert(firstListener.calledWith('value'));
                assert(secondListener.calledWith('value'));
                done();
            }, 0);

        });
    });

    describe('triggerSingle', function() {
        var model = new owl.Model({}, {
            url: '/things/:id'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        it('should trigger event', function (done) {
            model.triggerSingle('event');

            setTimeout(function() {
                assert(firstListener.calledOnce);
                assert(secondListener.calledOnce);
                done();
            }, 0);
        });
    });

    describe('triggerSingle (when collection defined)', function() {
        var collection = new owl.Collection([], {
            url: ''
        });
        var model = new owl.Model({}, {
            url: '/things/:id',
            collection: collection
        });
        before(function() {
            sinon.stub(collection, 'emit');
        });
        it('should trigger event', function () {
            model.triggerSingle('event');
            assert(collection.emit.called);
        });
        after(function() {
            collection.emit.restore();
        });
    });
    describe('off', function() {
        var model = new owl.Model({}, {
            url: '/things/:id'
        });
        var firstListener = sinon.spy();
        var secondListener = sinon.spy();
        var thirdListener = sinon.spy();
        model.on('event', firstListener);
        model.on('event', secondListener);
        model.off('event', firstListener);
        model.off('otherEvent', thirdListener);
        it('should trigger right event', function (done) {
            model.triggerSingle('event');

            setTimeout(function () {
                assert(firstListener.notCalled);
                assert(secondListener.called);
                assert(thirdListener.notCalled);
                done();
            }, 0);
        });
    });

    describe('off (without listener)', function() {
        var model = new owl.Model({}, {
            url: '/things/:id'
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
            url: '/things/:id'
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
            url: '/things/:id'
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
            url: '/things/:id'
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