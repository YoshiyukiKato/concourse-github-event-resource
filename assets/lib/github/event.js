const Octokit = require("@octokit/rest");
const globToRegExp = require("glob-to-regexp");

function isEventMatched(targetEvent, event) {
  return (
    targetEvent.type === event.type &&
    eventMatcher[targetEvent.type] &&
    eventMatcher[targetEvent.type](targetEvent, event)
  );
}

class GitHubEventClient {
  constructor(apiBaseUrl, accessToken) {
    this.octokit = new Octokit({
      auth: "token " + accessToken,
      baseUrl: apiBaseUrl || "https://api.github.com"
    });
  }

  async getRepoEvents(owner, name, targetEvent, lastEventRef) {
    const { data: events } = await this.octokit.activity.listRepoEvents({
      owner: owner,
      repo: name
    });
    const matchedEvents = events.filter(isEventMatched.bind(null, targetEvent));
    const lastRefIndex = matchedEvents.findIndex(
      event => event.id === lastEventRef
    );
    return lastRefIndex > 0 ? matchedEvents.slice(lastRefIndex) : matchedEvents;
  }

  extractRefsFromEvents(events) {
    return events.map(({ id }) => {
      return { ref: id };
    });
  }
}

const eventMatcher = {
  CreateEvent: (
    { ref: targetRef, ref_type: targetRefType },
    { payload: { ref, ref_type: refType } }
  ) => {
    return targetRefType === refType && globToRegExp(targetRef).test(ref);
  },

  DeleteEvent: (
    { ref: targetRef, ref_type: targetRefType },
    { payload: { ref, ref_type: refType } }
  ) => {
    return targetRefType === refType && globToRegExp(targetRef).test(ref);
  }
};

module.exports = GitHubEventClient;
