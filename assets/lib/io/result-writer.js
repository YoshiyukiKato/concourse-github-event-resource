const fs = require("fs");

exports.writeResult = (json) => {
  const writer = fs.createWriteStream(null, { fd: 3 });
  writer.write(JSON.stringify(json));
  writer.close();
}
  