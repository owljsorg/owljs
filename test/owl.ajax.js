describe('owl.ajax', function() {
    var response = [{ "id": 1, "name": "Nexus 5" },  { "id": 2, "name": "Nexus 10" }];
    var server = sinon.fakeServer.create();
    server.respondWith('GET', '/things', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
    ]);
    server.respondWith('DELETE', '/things', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({})
    ]);
    server.respondWith('POST', '/things', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({})
    ]);
    server.respondWith('GET', '/something', [
        404,
        { 'Content-Type': 'application/json' },
        '{}'
    ]);

    describe('request', function() {
        it('should make GET by default', function(done) {
            owl.ajax.request({
                url: '/things'
            }).then(function(result) {
                expect(result).to.eql(response);
                done();
            });

            server.respond();
        });

        it('should make GET request to /things', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'GET'
            }).then(function(result) {
                expect(result).to.eql(response);
                done();
            });

            server.respond();
        });

        it('should make DELETE request to /things', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'DELETE'
            }).then(function(result) {
                expect(result).to.eql({});
                done();
            });

            server.respond();
        });

        it('should make POST request to /things', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'POST',
                data: {}

            }).then(function(result) {
                expect(result).to.eql({});
                done();
            });

            server.respond();
        });

        it('should make POST request to /things with files', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'POST',
                data: {
                    test: 'test'
                },
                files: {
                    file: {}
                }
            }).then(function(result) {
                expect(result).to.eql({});
                done();
            });

            server.respond();
        });
    });

    describe('request (not found)', function() {
        before(function () {
            sinon.stub(owl.ajax, 'error');
        });
        it('should catch error', function(done) {
            owl.ajax.request({
                url: '/something',
                type: 'GET'
            }).catch(function(error) {
                assert(owl.ajax.error.called);
                expect(error.status).to.eql(404);
                expect(error.responseText).to.eql('{}');
                done();
                owl.ajax.restore();
            });

            server.respond();
        });
    });

    describe('toJsonString', function() {
        it('stringify object', function() {
            expect(owl.ajax.toJsonString({
                aaa: 'bbb'
            })).to.eql('{"aaa":"bbb"}');
        });
    });

    describe('toJsonString (not object)', function() {
        it('stringify object', function() {
            expect(owl.ajax.toJsonString(123)).to.eql(123);
        });
    });

    describe('toJsonString (undefined)', function() {
        it('stringify object', function() {
            expect(owl.ajax.toJsonString(undefined)).to.eql('');
        });
    });
});
