const globToRegExp = require("glob-to-regexp");

function isEventMatched(targetEvent, event) {
  return (
    targetEvent.type === event.type &&
    eventMatcher[targetEvent.type] &&
    eventMatcher[targetEvent.type](targetEvent, event)
  );
}

exports.getTargetEvents = function(targetEvent, lastEventRef, events) {
  const matchedEvents = events.filter(isEventMatched.bind(null, targetEvent));

  const lastRefIndex = matchedEvents.findIndex(
    event => event.id === lastEventRef
  );

  return lastRefIndex > 0 ? matchedEvents.slice(lastRefIndex) : matchedEvents;
};

exports.getEventRefs = function(events) {
  return events.map(({ id }) => {
    return { ref: id };
  });
};

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
