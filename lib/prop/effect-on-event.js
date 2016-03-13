var effectOnEventCommandId = require('../uuids').ballControl.effectOnEvent;
var ballEvents = require('../uuids').ballEvents;

function effectOnEvent(event, command, permanent, characteristic) {
  var buf = new Buffer(10);
  var permanentId = '-permanent';

  if (permanent === undefined || permanent && !event.includes(permanentId)) { event += permanentId; }
  var eventHex = ballEvents[event] || '00';

  buf.write(effectOnEventCommandId + eventHex + command, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING effectOnEvent: ", error); }
  });
}

module.exports = effectOnEvent;