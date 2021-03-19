const Scraper = require("../scraper");

const sourceUrls = [
  ["https://www.freetimelearning.com/online-quiz/react-js-quiz.php", 1],
  ["https://www.freetimelearning.com/online-quiz/java-quiz.php", 7],
  ["https://www.freetimelearning.com/online-quiz/node-js-quiz.php", 1],
  ["https://www.freetimelearning.com/online-quiz/sql-quiz.php", 1],
  ["https://www.freetimelearning.com/online-quiz/html-quiz.php", 6],
  ["https://www.freetimelearning.com/online-quiz/css-quiz.php", 5],
  ["https://www.freetimelearning.com/online-quiz/javascript-quiz.php", 5],
];

sourceUrls.forEach(([url, sections], ind) => {
  scrapeFreeTimeLearning(url, sections).then((questions) =>
    console.log(questions)
  );
});

async function scrapeFreeTimeLearning(url, sections) {
  const questionsInCategory = [];
  for (let i = 0; i < sections; i++) {
    let sectionUrl = i ? createSectionUrl(url, i + 1) : url;
    const questionsInSection = await scrapeSection(sectionUrl);
    questionsInCategory.push(...questionsInSection);
  }
  return questionsInCategory;
}

async function scrapeSection(url) {
  const pages = await getPages(url);
  const questionsInSection = [];
  for (let i = 1; i <= pages.length; i++) {
    const questionsInPage = await scrapePage(`${url}?page=${i}`);
    questionsInSection.push(...questionsInPage);
  }
  return questionsInSection;
}

let count = 100;
async function scrapePage(url) {
  const questionsInPage = [];
  for (let i = 0; i < 3; i++) {
    questionsInPage.push(i);
  }
  return questionsInPage;
}

function createSectionUrl(input, i) {
  input = input.split("/");
  const section = input[4].split(".")[0] + `-section-${i}.php`;
  input.splice(4, 1, section);
  return input.join("/");
}

async function getPages(url) {
  const scraper = new Scraper(undefined, url);
  const htmlStr = await scraper.fetchHtml();
  const document = scraper.createDOM(htmlStr);
  return [...document.querySelector(".pagination").children];
}
