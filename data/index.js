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

const tg = [...tgCh1, ...tgCh2, ...tgCh3, ...tgCh4, ...tgCh5];
const top = thisObjProCh1.concat(
  thisObjProCh2,
  thisObjProCh3,
  thisObjProCh4,
  thisObjProCh5,
  thisObjProCh6
);
const scopeClosures = scCh1.concat(scCh2, scCh3, scCh4, scCh5);

module.exports = { tg, top, scopeClosures };
