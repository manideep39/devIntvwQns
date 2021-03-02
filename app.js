const Scraper = require("./scraper");
const { scrapeLyndaRepo } = require("./utils.js/scrapingFunctions");

const scraper = new Scraper("./markdown/lydiahallie_javascript-questions.md");

console.log(scraper.showMarkdown);
console.log(scraper.showHtml);
const dom = scraper.createDOM();
scrapeLyndaRepo(dom);
