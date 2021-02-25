const fs = require("fs");

const Scraper = require("./scraper");
const MarkdownConfig = require("./configMarkdown");

const scraper = new Scraper();
const markdownConfig = new MarkdownConfig("h1", ["pre", "code"], "p");
const data = [];

function scrapeLydiahallie(document) {
  const headings = document.querySelectorAll("h6");
  const codeBlocks = document.querySelectorAll("pre code");
  const options = document.querySelectorAll("ul");
  const rightAnswers = document.querySelectorAll("h4");
  const explanations = document.querySelectorAll("details");

  headings.forEach((ele, ind) => {
    const heading = Scraper.html2Markdown(
      markdownConfig.createHeading(ele.textContent)
    );
    const codeBlock = Scraper.html2Markdown(
      markdownConfig.createCode(codeBlocks[ind].textContent)
    );
    const explanation = Scraper.html2Markdown(
      markdownConfig.createExplanation(explanations[ind].textContent)
    );
    const question = {
      statement: [heading, codeBlock],
      explanation,
    };

    data.push(question);
  });

  fs.writeFileSync("data.json", JSON.stringify({data}));
}

module.exports = { scrapeLydiahallie };
