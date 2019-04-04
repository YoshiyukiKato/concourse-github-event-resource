exports.parseInput = () => {
  const source = JSON.parse(process.argv[2] || "{}");
  const payload = JSON.parse(process.argv[3] || "{}");
  
  return {
    source,
    payload
  }
}