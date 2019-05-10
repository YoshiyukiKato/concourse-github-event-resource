const path = require("path");
const GithubEventClient = require("../github/event");
const { parseArgs } = require("../io/input");
const { writeResult, writeJsonFile, writeLog } = require("../io/output");

const { source, payload } = parseArgs();
const EVENTS_JSON_PATH = path.resolve(source, "events.json");
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

  if (events.length > 0) {
    const eventRefs = github.extractRefsFromEvents(events);
    const latestEventRef = eventRefs[0];
    writeJsonFile(EVENTS_JSON_PATH, { events: events });
    writeResult({
      version: latestEventRef,
      metadata: [{ name: "EventType", value: payload.source.event.type }]
    });
  } else {
    writeResult({ version: { ref: "none" } });
  }
  process.exit(0);
})().catch(err => {
  writeLog(err);
  process.exit(1);
});
