const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    
    it('generates SHA-256 hashed output', () => {
        expect(cryptoHash('prasanna')).
            toEqual('eb1e7c198c4d064bd427e9e4952bc82c47875e2a11a4824d555d826256e82377');
    });

    it('produces the same hash with arguments with any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'two', 'one'));
    });
});