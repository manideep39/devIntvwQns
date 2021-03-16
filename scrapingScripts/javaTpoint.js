const fs = require("fs");
const Scraper = require("../scraper");
const scraperHtml = new Scraper(
  undefined,
  "https://www.javatpoint.com/html-interview-questions"
);
const scraperAndroid = new Scraper(
  undefined,
  "https://www.javatpoint.com/android-interview-questions"
);

const scraperCss = new Scraper(
  undefined,
  "https://www.javatpoint.com/css-interview-questions"
);

const scraperReact = new Scraper(
  undefined,
  "https://www.javatpoint.com/react-interview-questions"
);

const scraperJs = new Scraper(
  undefined,
  "https://www.javatpoint.com/javascript-interview-questions"
);

const scraperNode = new Scraper(
  undefined,
  "https://www.javatpoint.com/node-js-interview-questions"
);

const scraperMongoDB = new Scraper(
  undefined,
  "https://www.javatpoint.com/mongodb-interview-questions"
);

scraperMongoDB.saveHtml("../scrapingSource/html/test.html");

scrapeJavaTpoint(
  scraperReact,
  "../scrapedData/javaTpoint/javaTpointReact.json"
);

async function scrapeJavaTpoint(scraper, saveFileTo) {
  const htmlStr = await scraper.fetchHtml();
  const document = scraper.createDOM(htmlStr);
  [...document.querySelectorAll("img")].forEach((node) => node.remove());
  const data = [...document.querySelector("#city td").children];
  const questions = [];
  let explanationCont = [];
  let statement = "";
  let start = false;
  data.forEach((node, ind) => {
    if (node.nodeName === "H3" && !start) {
      start = true;
      statement = document.createElement("h3");
      statement.textContent = node.textContent.split(")")[1].trim();
    } else if (
      node.nodeName === "HR" ||
      node.id === "interviewcategory" ||
      node.nodeName === "H2" ||
      node.nodeName === "H3"
    ) {
      if (statement && explanationCont.length) {
        const explanation = document.createElement("div");
        explanation.append(...explanationCont);
        questions.push({
          type: "LONG",
          statement: Scraper.html2Markdown(statement),
          explanation: Scraper.html2Markdown(explanation),
        });
      }
      start = false;
      if (node.nodeName === "H3") {
        statement = document.createElement("h3");
        statement.textContent = node.textContent.split(")")[1].trim();
        start = true;
      }
      explanationCont = [];
    } else if (start) {
      if (node.className === "codeblock") {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.innerHTML = node.innerHTML;
        pre.append(code);
        explanationCont.push(pre);
      } else {
        explanationCont.push(node);
      }
    }
  });
  Scraper.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total questions scraped: ", questions.length);
}
