var randomColorCommandId = require('../uuids').ballControl.randomColor;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function randomColor(duration, dutyCycle, mode, characteristic) {
  duration = getHex(duration) + '01';
  dutyCycle = getHex(dutyCycle);
  mode = (mode) ? getHex(mode) : '03';

  raw(randomColorCommandId + mode + duration + dutyCycle, characteristic);
}

module.exports = randomColor;