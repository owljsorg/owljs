describe('owl.Collection', function() {
    var server = sinon.fakeServer.create();
    server.respondWith('GET', '/things', [
        200,
        { 'Content-Type': 'application/json' },
        '[{ "id": 1, "name": "Nexus 5" },  { "id": 2, "name": "Nexus 10" }]'
    ]);
    server.respondWith('GET', '/things?type=tablet', [
        200,
        { 'Content-Type': 'application/json' },
        '[{ "id": 2, "name": "Nexus 10" }]'
    ]);

    describe('fetch', function() {
        it('should make GET request to /things', function(done) {
            var collection = new owl.Collection([], {
                url: '/things',
                model: owl.Model
            });
            collection.fetch().then(function(result) {

                expect(result).to.eql([
                    { id: 1, name: "Nexus 5" },
                    { id: 2, name: "Nexus 10" }
                ]);
                expect(collection.getData()).to.eql([
                    { id: 1, name: "Nexus 5" },
                    { id: 2, name: "Nexus 10" }
                ]);

                done();
            });

            server.respond();
        });
    });

    describe('fetch with data', function() {
        it('should make GET request to /things?type=tablet', function(done) {
            var collection = new owl.Collection([], {
                url: '/things',
                model: owl.Model
            });
            collection.fetch({
                type: 'tablet'
            }).then(function(result) {
                expect(result).to.eql([
                    { id: 2, name: "Nexus 10" }
                ]);
                expect(collection.getData()).to.eql([
                    { id: 2, name: "Nexus 10" }
                ]);
                done();
            });

            server.respond();
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
});
