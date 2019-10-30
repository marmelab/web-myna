import { transformBinaryToUtf8, buildFlattenedNameValueMap } from './harFactory.js';

describe('.har Factoctory', () => {
    describe('transformBinaryToUtf8', () => {
        it('should return null if binary is null', () => {
            expect(transformBinaryToUtf8(null)).toBeNull();
        });

        it('should return string from binary', () => {
            const binary = Buffer.from('{ "foo": "bar" }', 'binary');
            expect(transformBinaryToUtf8(binary)).toEqual('{ "foo": "bar" }');
        });
    });

    describe('buildFlattenedNameValueMap', () => {
        it('should transform an object in an array of name/value object content', () => {
            expect(buildFlattenedNameValueMap({ foo: 'bar' })).toEqual([{ name: 'foo', value: 'bar' }]);
        });
    });
});
