const fs = require("fs");
const Scraper = require("../scraper");
const Cleaner = require("../cleaner");

scrapePangara("../html/pangara.html", "./AndroidData/pangara.json");

function scrapePangara(htmlSource, saveFileName) {
  const htmlStr = fs.readFileSync(htmlSource);
  const scraper = new Scraper();
  const document = scraper.createDOM(htmlStr);
  const article = document.querySelector("article");
  const section = article.children[2].children[1];
  const dataCont = [...section.children[0].children[0].children];
  const questions = [];
  let question = {};
  let explanation = [];
  let start = false;
  let count = 0;
  dataCont.map((node, ind) => {
    if (node.nodeName == "H2" || node.textContent.trim() === "Conclusion") {
      if (start) {
        const expCont = document.createElement("div");
        expCont.append(...explanation);
        question["explanation"] = Cleaner.html2Markdown(expCont);
        questions.push(question);
        explanation = [];
        count++;
      }
      start = true;
      const statement = document.createElement("h2");
      const txt = node.textContent.split(".").slice(1).join(".").trim();
      statement.textContent = txt;
      question = { type: "LONG", statement: Cleaner.html2Markdown(statement) };
    } else {
      if (start && node.nodeName !== "H1" && node.nodeName !== "FIGURE") {
        explanation.push(node);
      }
    }
  });
  Cleaner.saveFile(saveFileName, JSON.stringify({ questions }));
  console.log("Questions scraped: ", count);
}
