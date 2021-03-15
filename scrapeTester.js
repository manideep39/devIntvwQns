const fs = require("fs");
const Scraper = require("./scraper");

class ScrapeTester extends Scraper {
  constructor(jsonFileLoc) {
    super();
    this.jsonFileLoc = jsonFileLoc;
  }

  checkLongQnType(saveHtmlTo) {
    const json = fs.readFileSync(this.jsonFileLoc, "utf-8");
    const { questions } = JSON.parse(json);
    const document = this.createDOM("<html><body></body></html>");
    questions.forEach((node) => {
      const statement = document.createElement("h3");
      statement.innerHTML = this.markdown2Html(node.statement);
      const explanation = document.createElement("div");
      explanation.innerHTML = this.markdown2Html(node.explanation);
      const hr = document.createElement("hr");
      document.body.append(statement, explanation, hr);
    });
    this.saveHtml(saveHtmlTo, document.body.innerHTML);
  }
}

module.exports = ScrapeTester;
