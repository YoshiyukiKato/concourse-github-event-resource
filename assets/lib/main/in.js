const {parseInput} = require("../io/input-parser");
const {writeResult} = require("../io/result-writer");

const {source, payload} = parseInput();

console.log("source & payload", source, payload);

writeResult({ ref : "none" });