const Octokit = require("@octokit/rest");
const { parseArgs } = require("../io/input");
const { writeLog, writeResult } = require("../io/output");
const { isEventMatched } = require("../github/event");

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
  const matchedEvents = events.filter(
    isEventMatched.bind(null, payload.source.event)
  );
  if (matchedEvents.length > 0) {
    writeResult(matchedEvents);
  } else {
    writeResult([{ ref: "none" }]);
  }
  process.exit(0);
})().catch(err => {
  writeLog(err);
  process.exit(1);
});
