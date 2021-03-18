const ScrapeTester = require("../scrapeTester");

const scrapeTester = new ScrapeTester(
  "../scrapedData/mindmajix/mindmajixMongodb.json"
);

scrapeTester.checkLongQnType("./testData.html");
