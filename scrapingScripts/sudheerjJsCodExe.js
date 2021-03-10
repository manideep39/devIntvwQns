const Scraper = require("../scraper");
const Cleaner = require("../cleaner");
const scraper = new Scraper("../markdown/sudheerj-javascript-cod-exe.md");

// console.log(scraper.showMarkdown);
// console.log(scraper.showHtml);
scrapeSudheerjJsCodExe();

function scrapeSudheerjJsCodExe() {
  let count = 0;
  const document = scraper.createDOM();
  const h4 = [...document.querySelectorAll("h4")];
  const pre = document.querySelectorAll("h4 + pre");
  const ul = document.querySelectorAll("ul");
  const details = document.querySelectorAll("details");
  const questions = [];
  h4.forEach((question, ind) => {
    const statement = document.createElement("h1");
    statement.textContent = question.textContent
      .split(".")
      .slice(1)
      .join(".")
      .trim();
    const codeBlock = Cleaner.html2Markdown(pre[ind]);
    const answer = details[ind].children[2].textContent.split(" ")[1];
    const explanation = document.createElement("div");
    explanation.append(...[...details[ind].children].slice(3));
    const options = [...ul[ind].children].map((option, ind) => {
      const li = document.createElement("li");
      li.textContent = option.textContent.split(":").slice(1).join(":").trim();
      return { text: Cleaner.html2Markdown(li), correct: +answer === ind + 1 };
    });
    questions.push({
      type: "MCQ",
      statement: Cleaner.html2Markdown(statement) + "\n" + codeBlock,
      options,
      explanation: Cleaner.html2Markdown(explanation),
    });
    count++;
  });
  Cleaner.saveFile(
    "./sudheerjJsDataCodExe/sudheerjJsDataCodExe.json",
    JSON.stringify({ questions })
  );
  console.log("Total questions scraped: ", count);
}
