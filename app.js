const fs = require("fs");
const commonmark = require("commonmark");

try {
  const data = fs.readFileSync(
    "./markdown/lydiahallie_javascript-questions.md",
    "utf8"
  );
  parse(data);
} catch (err) {
  console.error(err);
}

function parse(data) {
  const reader = new commonmark.Parser();
  const parsed = reader.parse(data);
  const walker = parsed.walker();
  let event, node;
  while ((event = walker.next())) {
    node = event.node;
    if (node.type === 'code_block') {
      console.log(node.literal);
    }
  }
}
