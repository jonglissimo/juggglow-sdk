var rainbowCommandId = require('../uuids').ballControl.rainbow;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function rainbow(duration, mode, characteristic) {
  mode = (mode) ? getHex(mode) : '03';
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration

  raw(rainbowCommandId + mode + duration, characteristic);
}

module.exports = rainbow;