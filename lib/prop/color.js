var colorCommandId = require('../uuids').ballControl.color;
var getHex = require('../utils/get-hex');
var raw = require('./raw');
var effectOnEvent = require('./effect-on-event');

function color(options) {
  var color1 = options.color;
  var color2 = options.color2;
  var characteristic = options.characteristic;
  
  var event = options.event;
  var permanent = options.permanent;

  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;
  var command = colorCommandId + color1 + color2;

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

module.exports = color;