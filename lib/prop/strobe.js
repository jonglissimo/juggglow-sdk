var strobeCommandId = require('../uuids').ballControl.strobe;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function strobe(duration, switchPercent, color1, color2, characteristic) {
  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;
  duration = getHex(duration);
  switchPercent = getHex(switchPercent);

  raw(strobeCommandId + duration + switchPercent + color1 + color2, characteristic);
}

module.exports = strobe;