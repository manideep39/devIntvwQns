const Scraper = require("./scraper");
const { scrapeLydiahallie } = require("./scrapingFunctions");

const myScraper = new Scraper("./markdown/lydiahallie_javascript-questions.md");

myScraper.scrape(scrapeLydiahallie);
