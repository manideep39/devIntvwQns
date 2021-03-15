const ScrapeTester = require("../scrapeTester");

const scrapeTester = new ScrapeTester(
  "../scrapedData/javaTpoint/javaTpointAndroid.json"
);

scrapeTester.checkLongQnType("./testData.html");
