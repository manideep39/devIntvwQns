const Scraper = require("../scraper");
const Cleaner = require("../cleaner");
const scraperNodeJs = new Scraper("../markdown/gauthamjm007/nodeJs.md");

Scraper.saveHtml(
  "../html/gauthamjm007NodeJs.html",
  scraperNodeJs.markdown2Html()
);

scrapeGauthamjm007(scraperNodeJs, "./gauthamjm007Data/gauthamjm007NodeJs.json");

function scrapeGauthamjm007(scraper, saveFileTo) {
  const document = scraper.createDOM();
  const questions = [];
  const liTags = [...document.querySelectorAll("body > ol > li")];
  liTags.forEach((node) => {
    const contents = [...node.childNodes];
    const statement = contents.find((node) => node.nodeName == "H3");
    let explanation = document.createElement("div");
    explanation.append(
      ...contents.filter(
        (node) => node.nodeName !== "H3" && node.textContent.trim() != ""
      )
    );
    const question = {
      type: "LONG",
      statement: Scraper.html2Markdown(statement),
      explanation: Scraper.html2Markdown(explanation),
    };
    questions.push(question);
  });
  Scraper.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total question scraped: ", questions.length);
}
