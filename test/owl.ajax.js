describe('owl.ajax', function() {
    var response = [{ "id": 1, "name": "Nexus 5" },  { "id": 2, "name": "Nexus 10" }];
    var server = sinon.fakeServer.create();
    server.respondWith('GET', '/things', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(response)
    ]);

    describe('ajax', function() {
        it('should make GET request to /things', function(done) {
            owl.ajax({
                url: '/things',
                type: 'GET'
            }).then(function(result) {
                expect(result).to.eql(response);
                done();
            });

            server.respond();
        });
    });
});
