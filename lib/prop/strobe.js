var strobeCommandId = require('../uuids').ballControl.strobe;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function strobe(interval, dutyCycle, color1, color2, characteristic) {
  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;
  interval = getHex(calculateInterval(interval));
  dutyCycle = getHex(calculateDutyCycle(dutyCycle));

  raw(strobeCommandId + interval + dutyCycle + color1 + color2, characteristic);
}

function calculateInterval(interval) {
  interval = parseInt(interval);

  if (interval >= 10 && interval <= 2560) {
    return parseInt((interval-10)/10);
  } else {
    return 0;
  }
}

function calculateDutyCycle(dutyCycle) {
  dutyCycle = parseFloat(dutyCycle);

  if (dutyCycle >= 0 && dutyCycle <= 1) {
    return parseInt(dutyCycle*255);
  } else {
    return 32;
  }
}

module.exports = strobe;