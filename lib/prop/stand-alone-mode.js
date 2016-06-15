var standAloneModeCommandId = require('../uuids').ballControl.standAloneMode;
var raw = require('./raw');

function standAloneMode(options) {
  var enable = options.enable;
  var characteristic = options.characteristic;

  var enableHex = (enable) ? '01' : '00';

  raw({
    command: standAloneModeCommandId + enableHex,
    characteristic: characteristic
  });
}

module.exports = standAloneMode;