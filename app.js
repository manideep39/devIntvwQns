

const Scraper = require("./scraper");
const { scrapeLydiahallie } = require("./scrapingFunctions");

const scraper = new Scraper("./markdown/lydiahallie_javascript-questions.md");

scraper.scrape(scrapeLydiahallie);
