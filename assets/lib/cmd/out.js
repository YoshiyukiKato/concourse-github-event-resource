const {parseArgs} = require("../io/input");
const {writeResult} = require("../io/output");

const {source, payload} = parseArgs();

writeResult({ ref : "none" });