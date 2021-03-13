const fs = require("fs");
const Scraper = require("../scraper");
const scraperHtml = new Scraper(
  undefined,
  "https://www.javatpoint.com/html-interview-questions"
);

scraperHtml.saveHtml("../scrapingSource/html/javaTpointHtml.html");
scrapeJavaTpointHtml(
  scraperHtml,
  "../scrapedData/javaTpoint/javaTpointHtml.json"
);

async function scrapeJavaTpointHtml(scraper, saveFileTo) {
  const htmlStr = await scraper.fetchHtml();
  const document = scraper.createDOM(htmlStr);
  [...document.querySelectorAll("img")].forEach((node) => node.remove());
  const data = [...document.querySelector("#city td").children];
  const questions = [];
  let explanationCont = [];
  let statement = "";
  let start = false;
  data.forEach((node) => {
    if (node.nodeName === "H3" && !start) {
      start = true;
      statement = document.createElement("h3");
      statement.textContent = node.textContent.split(")")[1].trim();
    } else if (node.nodeName === "HR" || node.id === "interviewcategory") {
      if (statement && explanationCont.length) {
        const explanation = document.createElement("div");
        explanation.append(...explanationCont);
        questions.push({
          type: "LONG",
          statement: Scraper.html2Markdown(statement),
          explanation: Scraper.html2Markdown(explanation),
        });
      }
      explanationCont = [];
      start = false;
    } else if (start) {
      explanationCont.push(node);
    }
  });
  Scraper.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total questions scraped: ", questions.length);
}
