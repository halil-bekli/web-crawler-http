const { crawlPage } = require('./crawl.js');

function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node main.js <input_file>. No website provided.");
        process.exit(1);

    }

    if (process.argv.length > 3) {
        console.log("Usage: node main.js <input_file>. Too many arguments.");
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log("starting crawl of " + baseURL + "...");
    crawlPage(baseURL);
}

main();