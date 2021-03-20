const contentCont = [
  ...document.querySelector("form").children[0].children[0].children,
];
console.log(contentCont);
const questionsInPage = [];
for (let i = 1; i < contentCont.length - 5; i += 3) {
  const question = { type: "MCQ" };
  question.statement = contentCont[i].querySelector(".quiz-que-margin");
  const optionsCont = contentCont[i + 1].querySelectorAll(".quiz-ans-margin");
  const correctOption = contentCont[2].querySelector(".ans-text-color");
  const allOptions = [];
  for (let i = 0; i < optionsCont.length; i++) {
    let singleOption = {};
    singleOption.text = optionsCont[i];
    singleOption.correct = isCorrect(i, correctOption);
    allOptions.push(singleOption);
  }
  question.options = allOptions;
  questionsInPage.push(question);
}

console.log(questionsInPage);
function isCorrect(index, correctOption) {
  correctOption = correctOption.textContent[8];
  const alphaIndex = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };
  return index === alphaIndex[correctOption];
}
