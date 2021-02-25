const fs = require("fs");

const rawData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(rawData);
console.log(data);
console.log(data.data[0].statement[0]);
console.log(data.data[0].statement[1]);
console.log(data.data[0].explanation);
