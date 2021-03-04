const upGoing = require("./upGoing.json");
const typesGrammar = require("./typesGrammar.json");
const thisObjectPrototypes = require("./thisObjectPrototypes.json");
const scopeClosures = require("./scopeClosures.json");
const es6Beyond = require("./es6Beyond.json");
const asyncPerformance = require("./asyncPerformance.json");

const ydkjsData = [];
const contents = [
  upGoing,
  typesGrammar,
  thisObjectPrototypes,
  scopeClosures,
  es6Beyond,
  asyncPerformance,
];

for (let i = 0; i < contents.length; i++) {
  ydkjsData.push(...contents[i]["questions"]);
}

module.exports = ydkjsData;
