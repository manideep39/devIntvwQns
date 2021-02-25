function scrapeLydiahallie(document) {
  const headings = document.querySelectorAll("h6");
  const codeBlocks = document.querySelectorAll("pre code");
  const options = document.querySelectorAll("ul");
  const rightAnswers = document.querySelectorAll("h4");
  const explanations = document.querySelectorAll("details");
  headings.forEach((ele, ind) => {
    console.log(ele.textContent);
    console.log(codeBlocks[ind].textContent);
    console.log(options[ind].textContent);
    console.log(rightAnswers[ind].textContent);
    console.log(explanations[ind].textContent);
  });
}

module.exports = { scrapeLydiahallie };
