const globToRegExp = require('glob-to-regexp');

exports.isEventMatched = function(targetEvent, event){
  return targetEvent.type === event.type
    && eventMatcher[targetEvent.type]
    && eventMatcher[targetEvent.type](targetEvent, event);
}

const eventMatcher = {
  "CreateEvent" : ({ref: targetRef, ref_type: targetRefType}, { payload: { ref, ref_type: refType } }) => {
    return targetRefType === refType && globToRegExp(targetRef).test(ref);
  },
  
  "DeleteEvent" : ({ref: targetRef, ref_type: targetRefType}, { payload: { ref, ref_type: refType } }) => {
    return targetRefType === refType && globToRegExp(targetRef).test(ref);
  }
};