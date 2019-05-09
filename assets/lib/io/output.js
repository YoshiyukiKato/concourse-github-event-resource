const fs = require("fs");
const RESULT_FILE_PATH = process.env.RESULT_FILE_PATH;

exports.writeResult = json => {
  const result = JSON.stringify(json);
  fs.writeFileSync(RESULT_FILE_PATH, result);
};

exports.writeJsonFile = (filePath, json) => {
  const result = JSON.stringify(json);
  fs.writeFileSync(filePath, result);
};

exports.writeLog = (...args) => {
  const log = args.map(JSON.stringify).join(" ");
  fs.writeSync(2, log + "\n");
};
