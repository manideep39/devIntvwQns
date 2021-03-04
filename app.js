const Cleaner = require("./cleaner");

const lyndiahallie = require("./scrapingScripts/lyndiahallieData/index");
const ydkjs = require("./scrapingScripts/ydkjsData/index");

const dataSources = [lyndiahallie, ydkjs];

const questions = [];

for (let i = 0; i < dataSources.length; i++) {
  questions.push(...dataSources[i]);
}

console.log("Total questions: ", questions.length);
Cleaner.saveFile("masterData.json", JSON.stringify({ questions }));
