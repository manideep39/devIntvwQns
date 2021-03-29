let freeTimeLearning = require("./freeTimeLearning.json").questions;
let lyndiahallie = require("./lyndiahallie.json").questions;
let ydkjs = require("./ydkjs.json").questions;
const sanfoundry = require("./sanfoundry.json").questions;

function addSource(source, data) {
  return data.map((question) => ({
    ...question,
    source,
  }));
}

ydkjs = addSource("https://github.com/austintackaberry/ydkjs-exercises", ydkjs);
freeTimeLearning = addSource(
  "https://www.freetimelearning.com",
  freeTimeLearning
);
lyndiahallie = addSource(
  "https://github.com/lydiahallie/javascript-questions",
  lyndiahallie
);

module.exports = lyndiahallie.concat(ydkjs, freeTimeLearning, sanfoundry);
