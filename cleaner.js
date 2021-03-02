const TurndownService = require("turndown");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM().window;

class Cleaner {
  createElement(txt, tag) {
    const statement = document.createElement(tag);
    statement.textContent = txt;
    return statement;
  }

  createTag(tag) {
    return document.createElement(tag);
  }

  createCodeblock(txt) {
    return `<pre><code>${txt}</code></pre>`;
  }

  static html2Markdown(htmlElement) {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(htmlElement);
    return markdown;
  }
}

module.exports = Cleaner;
