describe('owl.Collection', function() {
    var result = [{ "id": 1, "name": "Nexus 5" },  { "id": 2, "name": "Nexus 10" }];
    var collection = new owl.Collection([], {
        url: '/things',
        model: owl.Model
    });
    before(function() {
        sinon.stub(owl, 'ajax').returns(new owl.Promise(function(resolve, reject) {
            resolve(result);
        }));
    });
    describe('fetch', function() {
        it('should make GET request to /things', function(done) {
            collection.fetch().then(function() {
                assert(owl.ajax.calledWith({
                    url: '/things',
                    type: 'GET'
                }));

                done();
            });

        });
        it('set the data to the collection', function(done) {
            collection.fetch().then(function(result) {
                expect(result).to.eql(result);
                expect(collection.getData()).to.eql(result);

                done();
            });
        });
    });

    describe('fetch with data', function() {
        it('should make GET request to /things?type=tablet', function(done) {
            collection.fetch({
                type: 'tablet'
            }).then(function() {
                assert(owl.ajax.calledWith({
                    url: '/things?type=tablet',
                    type: 'GET'
                }));
                done();
            });
        });
        it('set the data to the collection', function(done) {
            collection.fetch().then(function(result) {
                expect(result).to.eql(result);
                expect(collection.getData()).to.eql(result);

                done();
            });
        });
    });

    describe('clear', function() {
        it('should clear the data', function () {
            var collection = new owl.Collection([
                {id:1, name: 'Nexus 5'},
                {id:2, name: 'Nexus 10'}
            ], {
                url: '/things',
                model: owl.Model
            });

            collection.clear();
            expect(collection.getData()).to.eql([]);
        });
    });

    describe('setData', function() {
        it('should set collection data', function () {
            var collection = new owl.Collection([], {
                url: '/things',
                model: owl.Model
            });

            collection.setData([
                {id:1, name: 'Nexus 5'},
                {id:2, name: 'Nexus 10'}
            ]);
            expect(collection.getData()).to.eql([
                {id:1, name: 'Nexus 5'},
                {id:2, name: 'Nexus 10'}
            ]);
        });
    });
    after(function() {
        owl.ajax.restore();
    });
});
