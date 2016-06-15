var effectOnEventCommandId = require('../uuids').ballControl.effectOnEvent;
var ballEvents = require('../uuids').ballEvents;
var raw = require('./raw');

function effectOnEvent(options) {
  var event = options.event;
  var command = options.command;
  var permanent = options.permanent;
  var characteristic = options.characteristic;

  var permanentId = '-permanent';

  if (permanent === undefined || permanent && !event.includes(permanentId)) { event += permanentId; }
  var eventHex = ballEvents[event] || '00';

  raw({
    command: effectOnEventCommandId + eventHex + command,
    characteristic: characteristic
  });
}

module.exports = effectOnEvent;