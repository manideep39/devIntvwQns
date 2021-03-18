const content = [...document.querySelector(".post-content").children];
[...document.querySelectorAll("img")].forEach((node) => node.remove());
console.log(document.querySelectorAll(".code").length);
let prevNode = null;
let scrapeBegin = false;
let startQuestion = false;
let explanation = [];
const questionNodes = ["H3", "H4"];
let question = {};
const questions = [];
for (let i = 0; i < content.length; i++) {
  const currentNode = content[i];
  // this begins scraping;
  if (currentNode.nodeName === "H3" && prevNode.nodeName === "H2") {
    scrapeBegin = true;
  }

  // this will end question scraping & push to questions
  if (startQuestion) {
    if (
      content.length - 1 === i ||
      (questionNodes.includes(currentNode.nodeName) &&
        currentNode.textContent[0] === "Q")
    ) {
      startQuestion = false;
      const explanationCont = document.createElement("div");
      explanationCont.append(...explanation);
      question.explanation = explanationCont;
      questions.push(question);
      question = {};
      explanation = [];
    } else {
      if (currentNode.className === "brush: js") {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.innerHTML = currentNode.innerHTML;
        pre.append(code);
        explanation.push(pre);
      } else {
        explanation.push(currentNode);
      }
    }
  }

  // this will create question and start question scraping;
  if (
    scrapeBegin &&
    questionNodes.includes(currentNode.nodeName) &&
    currentNode.textContent[0] === "Q"
  ) {
    startQuestion = true;
    question.statement = currentNode.textContent.split(":").slice(1).join(":");
  }

  prevNode = currentNode;
}

document.body.innerHTML = "";
questions.forEach(({ statement, explanation }) => {
  document.body.append(statement, explanation);
});

console.log("qns", questions);
