const { tg } = require("../data/index");
const Cleaner = require("../cleaner");

function scrapeYDKJS(dataArray, fileName) {
  const data = [];
  dataArray.forEach((ele, ind) => {
    console.log("number of questions: ", ind + 1);
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
  Cleaner.saveFile(fileName, JSON.stringify({ questions: data }));
}

scrapeYDKJS(tg, './ydkjsData/typesGrammar.json');
