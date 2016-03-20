var standAloneModeCommandId = require('../uuids').ballControl.standAloneMode;
var raw = require('./raw');

function standAloneMode(enable, characteristic) {
  var enableHex = (enable) ? '01' : '00';
  raw(standAloneModeCommandId + enableHex, characteristic);
}

module.exports = standAloneMode;