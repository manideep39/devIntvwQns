const fs = require("fs");
const commonmark = require("commonmark");
const jsdom = require("jsdom");
const TurndownService = require("turndown");
const fetch = require("node-fetch");

class Scraper {
  constructor(mkFileLocation, url) {
    this.mkFileLocation = mkFileLocation;
    this.url = url;
  }

  static html2Markdown(htmlElement) {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(htmlElement);
    return markdown;
  }

  async saveHtml(fileName, htmlBody) {
    const html =
      htmlBody ||
      (await (async () => {
        const htmlStr = await this.fetchHtml();
        const document = this.createDOM(htmlStr);
        return document.body.innerHTML;
      })());
    fs.writeFileSync(
      fileName,
      `<!DOCTYPE html><html lang="en"><head><script defer src="./script.js">
        </script></head><body>${html}</body></html>`
    );
  }

  static saveFile(fileName, data) {
    fs.writeFileSync(fileName, data);
  }

  async fetchHtml() {
    const res = await fetch(this.url);
    const htmlStr = await res.text();
    return htmlStr;
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
