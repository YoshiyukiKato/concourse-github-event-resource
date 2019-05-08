const { parseArgs } = require("../io/input");
const { writeResult, writeLog } = require("../io/output");

const { source, payload } = parseArgs();

writeLog(source);

writeResult({ ref: "none" });
