[...document.querySelectorAll("img")].forEach((node) => node.remove());
const data = [...document.querySelector("#city td").children];
const questions = [];
let explanationCont = [];
let statement = "";
let start = false;
data.forEach((node) => {
  if (node.nodeName === "H3" && !start) {
    start = true;
    statement = document.createElement("h3");
    statement.textContent = node.textContent.split(")")[1].trim();
  } else if (node.nodeName === "HR" || node.id === "interviewcategory") {
    if (statement && explanationCont.length) {
      const explanation = document.createElement("div");
      explanation.append(...explanationCont);
      questions.push({
        type: "LONG",
        statement: statement,
        explanation: explanation,
      });
    }
    explanationCont = [];
    start = false;
  } else if (start) {
    explanationCont.push(node);
  }
});

document.body.innerHTML = "";
questions.forEach(({ statement, explanation }) => {
  document.body.append(statement, explanation);
});
