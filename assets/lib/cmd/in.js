const Octokit = require("@octokit/rest");
const path = require("path");
const { parseArgs } = require("../io/input");
const { writeResult, writeJsonFile, writeLog } = require("../io/output");
const { getTargetEvents, getEventRefs } = require("../github/event");
const { source, payload } = parseArgs();
const EVENTS_JSON_PATH = path.resolve(source, "events.json");

(async () => {
  const octokit = new Octokit({
    auth: "token " + payload.source.access_token,
    baseUrl: payload.source.api_base_url
  });
  const { data: events } = await octokit.activity.listRepoEvents({
    owner: payload.source.repository.owner,
    repo: payload.source.repository.name
  });
  const targetEvents = getTargetEvents(
    payload.source.event,
    payload.version.ref,
    events
  );

  if (targetEvents.length > 0) {
    const latestEventRef = getEventRefs(targetEvents)[0];
    writeJsonFile(EVENTS_JSON_PATH, { events: targetEvents });
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
