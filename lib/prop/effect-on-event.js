var effectOnEventCommandId = require('../uuids').ballControl.effectOnEvent;
var ballEvents = require('../uuids').ballEvents;
var raw = require('./raw');

function effectOnEvent(event, command, permanent, characteristic) {
  var permanentId = '-permanent';

  if (permanent === undefined || permanent && !event.includes(permanentId)) { event += permanentId; }
  var eventHex = ballEvents[event] || '00';

  raw(effectOnEventCommandId + eventHex + command, characteristic);
}

module.exports = effectOnEvent;