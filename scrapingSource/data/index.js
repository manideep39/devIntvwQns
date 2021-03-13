const tgCh1 = require("./TypesGrammar/ch1");
const tgCh2 = require("./TypesGrammar/ch2");
const tgCh3 = require("./TypesGrammar/ch3");
const tgCh4 = require("./TypesGrammar/ch4");
const tgCh5 = require("./TypesGrammar/ch5");

const thisObjProCh1 = require("./ThisObjectPrototypes/ch1");
const thisObjProCh2 = require("./ThisObjectPrototypes/ch2");
const thisObjProCh3 = require("./ThisObjectPrototypes/ch3");
const thisObjProCh4 = require("./ThisObjectPrototypes/ch4");
const thisObjProCh5 = require("./ThisObjectPrototypes/ch5");
const thisObjProCh6 = require("./ThisObjectPrototypes/ch6");

const scCh1 = require("./ScopeClosures/ch1");
const scCh2 = require("./ScopeClosures/ch2");
const scCh3 = require("./ScopeClosures/ch3");
const scCh4 = require("./ScopeClosures/ch4");
const scCh5 = require("./ScopeClosures/ch5");

const es6Ch1 = require("./ES6Beyond/ch1");
const es6Ch2 = require("./ES6Beyond/ch2");
const es6Ch3 = require("./ES6Beyond/ch3");
const es6Ch4 = require("./ES6Beyond/ch4");
const es6Ch5 = require("./ES6Beyond/ch5");
const es6Ch6 = require("./ES6Beyond/ch6");
const es6Ch7 = require("./ES6Beyond/ch7");
const es6Ch8 = require("./ES6Beyond/ch8");

const asyncCh1 = require("./AsyncPerformance/ch1");
const asyncCh2 = require("./AsyncPerformance/ch2");
const asyncCh3 = require("./AsyncPerformance/ch3");
const asyncCh4 = require("./AsyncPerformance/ch4");
const asyncCh5 = require("./AsyncPerformance/ch5");
const asyncCh6 = require("./AsyncPerformance/ch6");

const upGoingCh1 = require("./UpGoing/ch1");
const upGoingCh2 = require("./UpGoing/ch2");

const typesGrammar = tgCh1.concat(tgCh2, tgCh3, tgCh4, tgCh5);

const thisObjectPrototypes = thisObjProCh1.concat(
  thisObjProCh2,
  thisObjProCh3,
  thisObjProCh4,
  thisObjProCh5,
  thisObjProCh6
);

const scopeClosures = scCh1.concat(scCh2, scCh3, scCh4, scCh5);

const es6Beyond = es6Ch1.concat(
  es6Ch2,
  es6Ch3,
  es6Ch4,
  es6Ch5,
  es6Ch6,
  es6Ch7,
  es6Ch8
);

const asyncPerformance = asyncCh1.concat(
  asyncCh2,
  asyncCh3,
  asyncCh4,
  asyncCh5,
  asyncCh6
);

const upGoing = upGoingCh1.concat(upGoingCh2);

module.exports = {
  upGoing,
  typesGrammar,
  thisObjectPrototypes,
  scopeClosures,
  es6Beyond,
  asyncPerformance,
};
