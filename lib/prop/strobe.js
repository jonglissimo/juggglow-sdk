var strobeCommandId = require('../uuids').ballControl.strobe;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function strobe(options) {
  var interval = options.interval;
  var dutyCycle = options.dutyCycle;
  var color = options.color;
  var color2 = options.color2;
  var characteristic = options.characteristic;

  color = getHex(color);
  color2 = (color2) ? getHex(color2) : color;
  interval = getHex(calculateInterval(interval));
  dutyCycle = getHex(calculateDutyCycle(dutyCycle));

  raw({
    command: strobeCommandId + interval + dutyCycle + color + color2,
    characteristic: characteristic
  });
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