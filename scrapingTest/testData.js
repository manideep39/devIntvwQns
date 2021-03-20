const ScrapeTester = require("../scrapeTester");

const scrapeTester = new ScrapeTester(
  "../scrapedData/freeTimeLearning/reactJs.json"
);

scrapeTester.checkMcqQnTypes("./testData.html");
