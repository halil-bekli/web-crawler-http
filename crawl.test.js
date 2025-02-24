const { normalizeUrl, getURLsFromHTML } = require('./crawl');
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

test('normalizeUrl strip http', () => {
    const input = 'http://EXAMPLE.com/path/'
    const actual = normalizeUrl(input)
    const expected = 'example.com/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = 
    `
    <html>
    <body>
    <a href="http://example.com/path/">Example Site</a>
    </body>
    </html>
    `
    const inputBaseURL = 'http://example.com/path/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://example.com/path/'] 
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = 
    `
    <html>
    <body>
    <a href="/path/">Example Site</a>
    </body>
    </html>
    `
    const inputBaseURL = 'http://example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://example.com/path/'] 
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = 
    `
    <html>
    <body>
    <a href="http://example.com/path1/">Example Path One</a>
    <a href="/path2/">Example Path Two</a>
    </body>
    </html>
    `
    const inputBaseURL = 'http://example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://example.com/path1/', 'http://example.com/path2/'] 
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = 
    `
    <html>
    <body>
    <a href="invalid">Invalid URL</a></a>
    </body>
    </html>
    `
    const inputBaseURL = 'http://example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = [] 
    expect(actual).toEqual(expected)
})