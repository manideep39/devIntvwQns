const Scraper = require("../scraper");
const Cleaner = require("../cleaner");

const scraperReact = new Scraper("../markdown/sudheerj/reactjs.md");
// console.log(scraperReact.showHtml);
scrapeSudheerjReact(
  scraperReact,
  "../scrapingScripts/sudheerjData/sudheerjReact.json"
);

function scrapeSudheerjReact(scraper, saveFileTo) {
  const document = scraper.createDOM();
  const olTags = [...document.querySelectorAll("body > ol")];

  // ----------- cleaning --------
  const hrefTags = document.querySelectorAll("[href='#table-of-contents']");
  hrefTags &&
    [...hrefTags].forEach((node) => node.parentNode.parentNode.remove());
  const imgTags = document.querySelectorAll("img");
  imgTags && [...imgTags].forEach((node) => node.parentNode.remove());
  // ------------------

  const questions = [];

  olTags.forEach((ol) => {
    const liTags = [...ol.children];
    liTags.forEach((li, ind) => {
      const question = { type: "LONG" };
      const contents = [...li.childNodes];
      const statement = contents.find((node) => node.nodeName == "H3");
      if (!statement) {
        return;
      }
      question["statement"] = Cleaner.html2Markdown(statement);
      const explanationCont = document.createElement("div");
      const explanationContent = contents.filter(
        (node) => node.nodeName != "H3" && node.textContent.trim() != ""
      );
      if (!explanationContent.length) {
        return;
      }
      explanationCont.append(...explanationContent);
      question["explanation"] = Cleaner.html2Markdown(explanationCont);
      questions.push(question);
    });
  });
  Cleaner.saveFile(saveFileTo, JSON.stringify({ questions }));
  console.log("Total questions scraped: ", questions.length);
}
