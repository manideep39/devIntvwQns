const fs = require("fs");
const Cleaner = require("../cleaner");

function scrapeLyndaRepo(document) {
  const questions = [];
  const headings = document.querySelectorAll("h6");
  const codeBlocks = document.querySelectorAll("pre code");
  const optionsList = document.querySelectorAll("ul");
  const rightAnswers = document.querySelectorAll("h4");
  const explanations = [...document.querySelectorAll("details")];

  const cleaner = new Cleaner("h1", ["pre", "code"], "p");

  headings.forEach((ele, ind) => {
    console.log("number of questions: ", ind + 1);
    // Statement: a)heading
    const heading = Cleaner.html2Markdown(
      cleaner.createElement(ele.textContent.slice(3), "h1")
    );
    // Statement: b)codeBlock
    const codeBlock = Cleaner.html2Markdown(
      cleaner.createCodeblock(codeBlocks[ind].textContent)
    );
    // Explanation:
    const paragraphs = [...explanations[ind].children];
    let explanation = cleaner.createTag("div");
    paragraphs
      .slice(3, paragraphs.length - 1)
      .forEach((pTag) => explanation.appendChild(pTag));

    explanation = Cleaner.html2Markdown(explanation);
    // Options:
    const options = [...optionsList[ind].children].map((option) => {
      const li = cleaner.createTag("li");
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

  fs.writeFileSync("data.json", JSON.stringify({ questions }));
}

module.exports = { scrapeLyndaRepo };
