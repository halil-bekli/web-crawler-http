const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages', () => {
    const input = {
        'http://example.com/path': 1,
        'http://example.com': 3,
    }
    const actual = sortPages(input)
    const expected = [
        ['http://example.com', 3],
        ['http://example.com/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'http://example.com/path': 1,
        'http://example.com': 3,
        'http://example.com/path2': 9,
        'http://example.com/path3': 5,
        'http://example.com/path4': 2,
    }
    const actual = sortPages(input)
    const expected = [
        ['http://example.com/path2', 9],
        ['http://example.com/path3', 5],
        ['http://example.com', 3],
        ['http://example.com/path4', 2],
        ['http://example.com/path', 1]
    ]
    expect(actual).toEqual(expected)
})