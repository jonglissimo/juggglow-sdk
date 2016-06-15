var randomColorCommandId = require('../uuids').ballControl.randomColor;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function randomColor(options) {
  var interval = options.interval;
  var dutyCycle = options.dutyCycle;
  var mode = options.mode;
  var characteristic = options.characteristic;
  interval = getHex(calculateInterval(interval));
  dutyCycle = getHex(calculateDutyCycle(dutyCycle));
  mode = (mode) ? getHex(mode) : '03';

  raw({
    command: randomColorCommandId + mode + interval + dutyCycle,
    characteristic: characteristic
  });
}

function calculateInterval(interval) {
  interval = parseInt(interval);

  if (interval >= 100 && interval <= 25600) {
    return parseInt((interval-100)/100);
  } else {
    return 0;
  }
}

function calculateDutyCycle(dutyCycle) {
  dutyCylce = parseFloat(dutyCycle);

  if (dutyCycle >= 0 && dutyCycle <= 1) {
    return parseInt(dutyCycle*255);
  } else {
    return 255;
  }
}

module.exports = randomColor;