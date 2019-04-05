exports.parseArgs = () => {
  const sourceDir = JSON.parse(process.argv[2] || "{}");
  const payload = JSON.parse(process.argv[3] || "{}");
  
  return {
    sourceDir,
    payload
  }
}