const Cleaner = require("../cleaner");
const Scraper = require("../scraper");

const scraper = new Scraper("../markdown/lydiahallie_javascript-questions.md");

// console.log(scraper.showMarkdown);
// console.log(scraper.showHtml);
const dom = scraper.createDOM();
scrapeLyndaRepo(dom);

function scrapeLyndaRepo(document) {
  const questions = [];
  const headings = document.querySelectorAll("h6");
  const codeBlocks = document.querySelectorAll("pre code");
  const optionsList = document.querySelectorAll("ul");
  const rightAnswers = document.querySelectorAll("h4");
  const explanations = [...document.querySelectorAll("details")];

  headings.forEach((ele, ind) => {
    console.log("number of questions: ", ind + 1);
    // Statement: a)heading
    const heading = Cleaner.html2Markdown(
      Cleaner.createElement(ele.textContent.slice(3), "h1")
    );
    // Statement: b)codeBlock
    const codeBlock = Cleaner.html2Markdown(
      Cleaner.createCodeblock(codeBlocks[ind].textContent)
    );
    // Explanation:
    const paragraphs = [...explanations[ind].children];
    let explanation = Cleaner.createTag("div");
    paragraphs
      .slice(3, paragraphs.length - 1)
      .forEach((pTag) => explanation.appendChild(pTag));

    explanation = Cleaner.html2Markdown(explanation);
    // Options:
    const options = [...optionsList[ind].children].map((option) => {
      const li = Cleaner.createTag("li");
      [...option.childNodes].slice(1).map((node) => li.appendChild(node));
      return {
        text: Cleaner.html2Markdown(li),
        correct:
          rightAnswers[ind].textContent.split(" ")[1] == option.textContent[0],
      };
    });

    const question = {
      type: "MCQ",
      statement: heading + "\n" + codeBlock,
      explanation,
      options,
    };

    questions.push(question);
  });

  Cleaner.saveFile('./lyndiahallieData/lyndiahallie.json', JSON.stringify({ questions }))
}
