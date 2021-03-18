const Scraper = require("../scraper.js");
const scraperReact = new Scraper(
  undefined,
  "https://mindmajix.com/reactjs-interview-questions"
);
const scraperAndroid = new Scraper(
  undefined,
  "https://mindmajix.com/android-interview-questions"
);
const scraperMongodb = new Scraper(
  undefined,
  "https://mindmajix.com/mongodb-interview-questions"
);

const scraperJs = new Scraper(
  undefined,
  "https://mindmajix.com/javascript-interview-questions"
);

scraperAndroid.saveHtml("../scrapingSource/html/test.html");

scrapeMindmajix(scraperReact, "../scrapedData/mindmajix/mindmajixReact.json");
scrapeMindmajix(
  scraperAndroid,
  "../scrapedData/mindmajix/mindmajixAndroid.json"
);
scrapeMindmajix(
  scraperMongodb,
  "../scrapedData/mindmajix/mindmajixMongodb.json"
);
scrapeMindmajix(scraperJs, "../scrapedData/mindmajix/mindmajixJs.json");

async function scrapeMindmajix(scraper, saveFileTo) {
  const htmlStr = await scraper.fetchHtml();
  const document = scraper.createDOM(htmlStr);
  const content = [...document.querySelector(".post-content").children];
  [...document.querySelectorAll("img")].forEach((node) => node.remove());
  const category = scraper.url.split("/")[3].split("-")[0];
  let prevNode = null;
  let scrapeBegin = false;
  let startQuestion = false;
  let explanation = [];
  const questionNodes = ["H3", "H4", "H5", "H6", "P"];
  let question = {
    type: "LONG",
    source: scraper.url,
  };
  const questions = [];
  for (let i = 0; i < content.length; i++) {
    const currentNode = content[i];
    // this begins scraping;
    if (currentNode.nodeName === "H3" && prevNode.nodeName === "H2") {
      scrapeBegin = true;
    }

    // this will end question scraping & push to questions
    if (startQuestion) {
      if (
        content.length - 1 === i ||
        (questionNodes.includes(currentNode.nodeName) &&
          currentNode.textContent.trim()[0] === "Q")
      ) {
        startQuestion = false;
        let explanationCont = document.createElement("div");
        explanationCont.append(...explanation);
        // to remove '**Ans**' from explanation
        explanationCont = Scraper.html2Markdown(explanationCont);
        if (explanationCont.slice(0, 5).toLowerCase() === "**ans") {
          explanationCont = explanationCont.slice(8).trim();
        }
        question.explanation = explanationCont;
        if (question.statement && explanation.length) {
          questions.push(question);
        }
        question = {
          type: "LONG",
          source: scraper.url,
        };
        explanation = [];
      } else {
        if (currentNode.className === "brush: js") {
          const pre = document.createElement("pre");
          const code = document.createElement("code");
          code.innerHTML = currentNode.innerHTML;
          pre.append(code);
          explanation.push(pre);
        } else {
          explanation.push(currentNode);
        }
      }
    }

    // this will create question and start question scraping;
    if (
      scrapeBegin &&
      questionNodes.includes(currentNode.nodeName) &&
      currentNode.textContent.trim()[0] === "Q"
    ) {
      startQuestion = true;
      // to remove similar "Q12)"" from statement.
      switch (category) {
        case "javascript":
        case "android":
        case "mongodb":
          question.statement = Scraper.html2Markdown(
            currentNode.textContent.split(")").slice(1).join(")").trim()
          );
          break;
        case "reactjs":
          if (currentNode.textContent.split(":").length === 1) {
            question.statement = Scraper.html2Markdown(
              currentNode.textContent.split(".").slice(1).join(".").trim()
            );
          } else {
            question.statement = Scraper.html2Markdown(
              currentNode.textContent.split(":").slice(1).join(":").trim()
            );
          }
          break;
      }
    }

    prevNode = currentNode;
  }
  Scraper.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total questions scraped: ", questions.length);
}
