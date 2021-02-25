class MarkdownConfig {
  constructor(statement, code, explanation, answer, options) {
    this.statement = statement;
    this.code = code;
    this.explanation = explanation;
    this.answer = answer;
    this.options = options;
  }

  createHeading(txt) {
    return `<${this.statement}>${txt}</${this.statement}>`;
  }

  createCode(txt) {
    return `<${this.code[0]}><${this.code[1]}>${txt}</${this.code[1]}></${this.code[0]}>`;
  }

  createExplanation(txt) {
    return `<${this.explanation}>${txt}</${this.explanation}>`;
  }
}

module.exports = MarkdownConfig;
