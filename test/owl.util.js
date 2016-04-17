describe('owl.util.js', function() {
    describe('clone', function() {
        var original = {
            one: 'one',
            two: 'two',
            sub: {
                something: 'else'
            }
        };
        var clone = owl.util.clone(original);
        it('should clone the first level of object', function() {
            expect(clone).to.be.deep.equal(original);
            expect(clone).to.be.not.equal(original);
            expect(clone.sub).to.be.equal(original.sub);
        });
    });
    describe('clone (deep)', function() {
        var original = {
            one: 'one',
            two: 'two',
            sub: {
                something: 'else'
            }
        };
        var clone = owl.util.clone(original, true);
        it('should clone the object', function() {
            expect(clone).to.be.deep.equal(original);
            expect(clone).to.be.not.equal(original);
            expect(clone.sub).to.not.equal(original.sub);
        });
    });
    describe('extend', function() {
        var first = {
            one: 'one',
            two: 'two',
            tree: 'somethings',
            sub: {
                other: 'side'
            }
        };
        var second = {
            tree: 'tree',
            four: 'four',
            sub: {
                something: 'else'
            }
        };
        var result = owl.util.extend(first, second);
        it('should extend first object by second', function() {
            expect(result.one).to.be.equal(first.one);
            expect(result.two).to.be.equal(first.two);
            expect(result.tree).to.be.equal(second.tree);
            expect(result.four).to.be.equal(second.four);
            expect(result.sub).to.be.equal(second.sub);
        });
    });
    describe('extend (deep)', function() {
        var first = {
            one: 'one',
            two: 'two',
            tree: 'somethings',
            sub: {
                other: 'side'
            }
        };
        var second = {
            tree: 'tree',
            four: 'four',
            sub: {
                something: 'else'
            }
        };
        var result = owl.util.extend(first, second, true);
        it('should extend first object by second', function() {
            expect(result.one).to.be.equal(first.one);
            expect(result.two).to.be.equal(first.two);
            expect(result.tree).to.be.equal(second.tree);
            expect(result.four).to.be.equal(second.four);
            expect(result.sub).to.be.not.equal(first.sub);
            expect(result.sub.other).to.be.equal(first.sub.other);
            expect(result.sub.something).to.be.equal(second.sub.something);
        });
    });
});
