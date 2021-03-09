const Scraper = require("../scraper");
const Cleaner = require("../cleaner");
const scraper = new Scraper("../markdown/sudheerj-javascript.md");

/* 
  - Table in markdown are not handled, they will be just text in a p tag
    separated by "|".
  - This handles all the questions except the exercise in the .md file.  
*/

// console.log(scraper.showMarkdown);
// console.log(scraper.showHtml);
scrapeSudheerjJs();

function scrapeSudheerjJs() {
  let count = 0;
  const questions = [];
  const document = scraper.createDOM();
  const container = document.querySelector("ol");
  [...container.children].map((list) => {
    // ----- some cleaning ---
    const tableOfCont = list.querySelector("[href='#table-of-contents']");
    tableOfCont && tableOfCont.parentNode.parentNode.remove();
    const src = list.querySelector("[src]");
    src && list.querySelector("[src]").parentNode.remove();
    // ----
    const contents = [...list.children];
    const statement = contents[0];
    const explanation = document.createElement("div");
    explanation.append(...contents.slice(1));
    const question = {
      type: "LONG",
      statement: Cleaner.html2Markdown(statement),
      explanation: Cleaner.html2Markdown(explanation),
    };
    questions.push(question);
    count++;
  });
  Cleaner.saveFile(
    "./sudheerjJsData/sudheerjJsData.json",
    JSON.stringify({ questions })
  );
  console.log("Total questions scraped: ", count);
}
