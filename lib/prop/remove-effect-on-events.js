var removeEffectOnEventsCommandId = require('../uuids').ballControl.removeEffectOnEvents;
var raw = require('./raw');

function removeEffectOnEvents(options) {
  var characteristic = options.characteristic;

  raw({
    command: removeEffectOnEventsCommandId,
    characteristic: characteristic
  });
}

module.exports = removeEffectOnEvents;