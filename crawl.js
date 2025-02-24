const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`actively crawling ${currentURL}`)

    try {
        const resp = await fetch(currentURL);

        if (resp.status > 399) {
            console.log(`error in fetching with status code ${resp.status} on ${currentURL}`)
            return
        }

        const constType = resp.headers.get('content-type')

        if (!constType.includes('text/html')) {
            console.log(`skipping ${currentURL} because it is not HTML!`)
            return
        }

        console.log(await resp.text())
    } catch (error) {
        console.log(`error fetching on ${currentURL}: ${error}`)
    }

}

function getURLsFromHTML(htmlBody, baseurl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative path
            try {
                const urlObj = new URL(`${baseurl}${linkElement.href}`)
                urls.push(`${baseurl}${linkElement.href}`)
            } catch (error) {
                console.error(`error with relative url:  ${error}`)
            }
        } else {
            // absolute path
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(linkElement.href)
            } catch (error) {
                console.error(`error with absolute url:  ${error}`)
            }
        }
    }
    return urls;
}

function normalizeUrl(urlString) {
    const urlObject = new URL(urlString);
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage,
}; 