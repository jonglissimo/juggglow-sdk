var standbyModeCommandId = require('../uuids').ballControl.standbyMode;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function standbyMode(options) {
  var minutes = options.minutes;
  var characteristic = options.characteristic;

  var standbyModeHex = getHex(minutes-1,2);

  raw({
    command: standbyModeCommandId + standbyModeHex,
    characteristic: characteristic
  });
}

module.exports = standbyMode;