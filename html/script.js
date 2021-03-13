// scraping testing file.

const questions = [];
const liTags = [...document.querySelectorAll("body > ol > li")];
document.querySelectorAll("img").forEach((node) => node.remove());
liTags.forEach((node) => {
  const contents = [...node.childNodes];
  const statement = contents.find((node) => node.nodeName == "H3");
  let explanation = document.createElement("div");
  explanation.append(
    ...contents.filter(
      (node) => node.nodeName !== "H3" && node.textContent.trim() != ""
    )
  );
  const question = { type: "LONG", statement, explanation };
  questions.push(question);
});
console.log(questions);

document.body.innerHTML = "";
questions.forEach(({ statement, explanation }) => {
  document.body.append(statement, explanation);
});
