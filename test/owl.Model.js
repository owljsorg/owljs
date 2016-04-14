describe('owl.Model.js', function() {
    var thing = { id: 1, name: 'Nexus 5' };
    var newThing = { name: 'Nexus 5' };
    describe('get and set', function() {
        var model = new owl.Model();
        before(function() {
            model.set('something', 'else');
        });
        it('should set the internal value', function() {
            expect(model.get('something')).to.be.eql('else');
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
                expect(result).to.be.eql(thing);
                expect(model.getData()).to.be.eql(thing);
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
            expect(model.getData()).to.be.eql({});
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
                expect(model.get('id')).to.be.eql(2);

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
                resolve({
                    id: 1
                });
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
    describe('save (update entry)', function() {
        var model = new owl.Model(thing, {
            urlRoot: '/things'
        });
        before(function() {
            sinon.stub(owl, 'ajax').returns(new Promise(function(resolve) {
                resolve({
                    id: 1
                });
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

});