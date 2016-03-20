var fadeCommandId = require('../uuids').ballControl.fade;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function fade(colorStart, colorEnd, duration, mode, characteristic) {
  colorStart = getHex(colorStart);
  colorEnd = (colorEnd) ? getHex(colorEnd) : colorStart;
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration
  mode = (mode) ? getHex(mode) : '03';

  raw(fadeCommandId + mode + duration + colorStart + colorEnd, characteristic);
}

module.exports = fade;