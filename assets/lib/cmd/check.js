const GithubEventClient = require("../github/event");
const { parseArgs } = require("../io/input");
const { writeLog, writeResult } = require("../io/output");

const { payload } = parseArgs();
const github = new GithubEventClient(
  payload.source.api_base_url,
  payload.source.access_token
);

(async () => {
  const events = await github.getRepoEvents(
    payload.source.repository.owner,
    payload.source.repository.name,
    payload.source.event,
    payload.version.ref
  );
  const eventRefs = github.extractRefsFromEvents(events);

  if (events.length > 0) {
    writeResult(eventRefs);
  } else {
    writeResult([{ ref: "none" }]);
  }
  process.exit(0);
})().catch(err => {
  writeLog(err);
  process.exit(1);
});
