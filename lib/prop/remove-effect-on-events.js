var removeEffectOnEventsCommandId = require('../uuids').ballControl.removeEffectOnEvents;
var raw = require('./raw');

function removeEffectOnEvents(characteristic) {
  raw(removeEffectOnEventsCommandId, characteristic);
}

module.exports = removeEffectOnEvents;