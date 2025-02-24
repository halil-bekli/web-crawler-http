const { normalizeUrl } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
    const input = 'http://example.com/path'
    const actual = normalizeUrl(input)
    const expected = 'example.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash', () => {
    const input = 'http://example.com/path/'
    const actual = normalizeUrl(input)
    const expected = 'example.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals', () => {
    const input = 'http://EXAMPLE.com/path/'
    const actual = normalizeUrl(input)
    const expected = 'example.com/path'
    expect(actual).toEqual(expected)
})