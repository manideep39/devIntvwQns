const fs = require("fs");
const commonmark = require("commonmark");
const jsdom = require("jsdom");

class Scraper {
  constructor(mkFileLocation) {
    this.mkFileLocation = mkFileLocation;
  }

  get showMarkdown() {
    return this.readMarkDownFile();
  }

  get showHtml() {
    return this.markdown2Html();
  }

  readMarkDownFile() {
    try {
      const markdown = fs.readFileSync(this.mkFileLocation, "utf-8");
      return markdown;
    } catch (err) {
      console.log("Error in reading file", err);
    }
  }

  markdown2Html(markdownFile) {
    const markdown = markdownFile || this.readMarkDownFile(this.mkFileLocation);
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(markdown);
    const htmlStr = writer.render(parsed);
    return htmlStr;
  }

  createDOM(html) {
    const htmlStr = html || this.markdown2Html();
    const { JSDOM } = jsdom;
    const { document } = new JSDOM(htmlStr).window;
    return document;
  }
}

module.exports = Scraper;
