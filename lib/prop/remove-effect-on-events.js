var removeEffectOnEventsCommandId = require('../uuids').ballControl.removeEffectOnEvents;

function removeEffectOnEvents(characteristic) {
  var buf = new Buffer(10);

  buf.write(removeEffectOnEventsCommandId, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING removeEffectOnEvents: ", error); }
  });
}

module.exports = removeEffectOnEvents;