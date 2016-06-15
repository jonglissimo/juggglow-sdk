var fadeCommandId = require('../uuids').ballControl.fade;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function fade(options) {
  var colorStart = options.colorStart;
  var colorEnd = options.colorEnd;
  var duration = options.duration;
  var mode = options.mode;
  var characteristic = options.characteristic;

  colorStart = getHex(colorStart);
  colorEnd = (colorEnd) ? getHex(colorEnd) : colorStart;
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration
  mode = (mode) ? getHex(mode) : '03';

  raw({
    command: fadeCommandId + mode + duration + colorStart + colorEnd,
    characteristic: characteristic
  });
}

module.exports = fade;