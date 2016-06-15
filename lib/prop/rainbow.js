var rainbowCommandId = require('../uuids').ballControl.rainbow;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function rainbow(options) {
  var duration = options.duration;
  var mode = options.mode;
  var characteristic = options.characteristic;

  mode = (mode) ? getHex(mode) : '03';
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration

  raw({
    command: rainbowCommandId + mode + duration,
    characteristic: characteristic
  });
}

module.exports = rainbow;