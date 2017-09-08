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
    server.respondWith('GET', '/something-wrong', [
        200,
        { 'Content-Type': 'application/json' },
        '{somethingInvalid:'
    ]);

    describe('request', function() {
        it('should make GET by default', function(done) {
            owl.ajax.request({
                url: '/things'
            }).then(function(result) {
                expect(result.data).to.eql(response);
                expect(result.status).to.eql(200);
                expect(result.headers).to.eql({
                    'Content-Type': 'application/json'
                });
                done();
            });

            server.respond();
        });

        it('should make GET request to /things', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'GET'
            }).then(function(result) {
                expect(result.data).to.eql(response);
                done();
            });

            server.respond();
        });

        it('should make DELETE request to /things', function(done) {
            owl.ajax.request({
                url: '/things',
                type: 'DELETE'
            }).then(function(result) {
                expect(result.data).to.eql({});
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
                expect(result.data).to.eql({});
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
                expect(result.data).to.eql({});
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

    describe('request (invalid)', function() {
        it('should catch error', function(done) {
            owl.ajax.request({
                url: '/something-wrong',
                type: 'GET'
            }).catch(function(error) {
                done();
                owl.ajax.restore();
            });

            server.respond();
        });
    });

    describe('toJsonString', function() {
        it('should stringify object', function() {
            expect(owl.ajax.toJsonString({
                aaa: 'bbb'
            })).to.eql('{"aaa":"bbb"}');
        });

        it('stringify return empty string when input is not an object', function() {
            expect(owl.ajax.toJsonString(123)).to.eql('');
        });
    });
});
