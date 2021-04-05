let freeTimeLearning = require("./freeTimeLearning.json").questions;
let lyndiahallie = require("./lyndiahallie.json").questions;
let ydkjs = require("./ydkjs.json").questions;
const sanfoundry = require("./sanfoundry.json").questions;

function addSource(source, data) {
  return data.map((question) => {
    if (question.type === "MCQ") {
      return {
        ...question,
        source,
        options: question.options.filter(({ text }) => text != ""),
      };
    }
    return {
      ...question,
      source,
    };
  });
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

const masterData = (module.exports = lyndiahallie.concat(
  ydkjs,
  freeTimeLearning,
  sanfoundry
));
