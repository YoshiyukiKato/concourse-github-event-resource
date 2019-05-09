const Octokit = require("@octokit/rest");
const { parseArgs } = require("../io/input");
const { writeLog, writeResult } = require("../io/output");
const { getTargetEvents, getEventsRefs } = require("../github/event");

const { payload } = parseArgs();

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
  const eventRefs = getEventRefs(targetEvents);

  if (targetEvents.length > 0) {
    writeResult(eventRefs);
  } else {
    writeResult([{ ref: "none" }]);
  }
  process.exit(0);
})().catch(err => {
  writeLog(err);
  process.exit(1);
});
