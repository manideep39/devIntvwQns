const Cleaner = require("../cleaner");

const {
  upGoing,
  typesGrammar,
  thisObjectPrototypes,
  scopeClosures,
  es6Beyond,
  asyncPerformance,
} = require("../data/index");

let globalTotal = 0;

function scrapeYDKJS(dataArray, fileName) {
  const data = [];
  let localTotal = 0;
  dataArray.forEach((ele, ind) => {
    localTotal++;
    const { question: statement, explanation, answers, correctAnswerId } = ele;
    const type =
      answers.length == 2 && ["True", "False"].includes(answers[0].text)
        ? "TF"
        : "MCQ";
    const question = {
      statement: Cleaner.html2Markdown(Cleaner.createElement(statement, "h1")),
      explanation: Cleaner.html2Markdown(
        Cleaner.createElement(explanation, "p")
      ),
      type,
    };
    switch (type) {
      case "TF":
        const correct =
          answers.filter((ele) => ele.id == correctAnswerId)[0].text == "True";
        question["correct"] = correct;
        break;
      case "MCQ":
        const options = [];
        answers.forEach((ele) => {
          const option = {
            text: Cleaner.html2Markdown(Cleaner.createElement(ele.text, "li")),
            correct: ele.id === correctAnswerId,
          };
          options.push(option);
        });
        question["options"] = options;
        break;
    }
    data.push(question);
  });
  globalTotal += localTotal;
  Cleaner.saveFile(fileName, JSON.stringify({ questions: data }));
  console.log("Questions created: Local total: ", localTotal);
}

scrapeYDKJS(upGoing, "./ydkjsData/upGoing.json");
scrapeYDKJS(typesGrammar, "./ydkjsData/typesGrammar.json");
scrapeYDKJS(thisObjectPrototypes, "./ydkjsData/thisObjectPrototypes.json");
scrapeYDKJS(scopeClosures, "./ydkjsData/scopeClosures.json");
scrapeYDKJS(es6Beyond, "./ydkjsData/es6Beyond.json");
scrapeYDKJS(asyncPerformance, "./ydkjsData/asyncPerformance.json");

console.log("\nQuestions created: Global total: ", globalTotal);
