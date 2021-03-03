const fs = require("fs");
const TurndownService = require("turndown");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM().window;

class Cleaner {
  static createElement(txt, tag) {
    const statement = document.createElement(tag);
    statement.textContent = txt;
    return statement;
  }

  static createTag(tag) {
    return document.createElement(tag);
  }

  static createCodeblock(txt) {
    return `<pre><code>${txt}</code></pre>`;
  }

  static html2Markdown(htmlElement) {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(htmlElement);
    return markdown;
  }

  static saveFile(fileName, data) {
    fs.writeFileSync(fileName, data);
  }
}

module.exports = Cleaner;
