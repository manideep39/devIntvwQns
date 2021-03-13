const Scraper = require("../scraper");
const Cleaner = require("../cleaner");
const scraperNodeJs = new Scraper("../markdown/gauthamjm007/nodeJs.md");
const scrapeExpressJs = new Scraper("../markdown/gauthamjm007/expressJs.md");
const scrapeMongoAndMongoose = new Scraper(
  "../markdown/gauthamjm007/mongoDBAndMongoose.md"
);

Scraper.saveHtml(
  "../html/gauthamjm007NodeJs.html",
  scraperNodeJs.markdown2Html()
);

Scraper.saveHtml(
  "../html/scrapeMongoAndMongoose.html",
  scrapeMongoAndMongoose.markdown2Html()
);

scrapeGauthamjm007(scraperNodeJs, "./gauthamjm007Data/gauthamjm007NodeJs.json");
scrapeGauthamjm007(
  scrapeExpressJs,
  "./gauthamjm007Data/gauthamjm007ExpressJs.json"
);
scrapeGauthamjm007(
  scrapeMongoAndMongoose,
  "./gauthamjm007Data/gauthamjm007MongoAndMongoose.json"
);

function scrapeGauthamjm007(scraper, saveFileTo) {
  const document = scraper.createDOM();
  document.querySelectorAll("img").forEach((node) => node.remove());
  const questions = [];
  const liTags = [...document.querySelectorAll("body > ol > li")];
  liTags.forEach((node) => {
    const contents = [...node.childNodes];
    const statement = contents.find((node) => node.nodeName == "H3");
    const explanationCont = document.createElement("div");
    const explanation = contents.filter(
      (node) => node.nodeName !== "H3" && node.textContent.trim() != ""
    );
    explanationCont.append(...explanation);
    if (statement.textContent && explanation.length) {
      const question = {
        type: "LONG",
        statement: Scraper.html2Markdown(statement),
        explanation: Scraper.html2Markdown(explanationCont),
      };
      questions.push(question);
    }
  });
  Scraper.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total question scraped: ", questions.length);
}
