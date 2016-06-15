var stopModeCommandId = require('../uuids').ballControl.stopMode;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function stopMode(options) {
  var seconds = options.seconds;
  var characteristic = options.characteristic;

  var stopModeHex = getHex(seconds-60,2);

  raw({
    command: stopModeCommandId + stopModeHex,
    characteristic: characteristic
  });
}

module.exports = stopMode;