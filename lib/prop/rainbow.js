var rainbowCommandId = require('../uuids').ballControl.rainbow;
var getHex = require('../utils/get-hex');
var raw = require('./raw');
var effectOnEvent = require('./effect-on-event');

function rainbow(options) {
  var duration = options.duration;
  var mode = options.mode;
  var characteristic = options.characteristic;
    
  var event = options.event;
  var permanent = options.permanent;

  mode = (mode) ? getHex(mode) : '03';
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration
  var command = rainbowCommandId + mode + duration;

if (event) {
    effectOnEvent({
      event: event,
      permanent: permanent,
      command: command,
      characteristic: characteristic
    });
  } else {
    raw({
      command: command,
      characteristic: characteristic
    });
  }
}

module.exports = rainbow;