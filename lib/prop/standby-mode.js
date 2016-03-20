var standbyModeCommandId = require('../uuids').ballControl.standbyMode;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function standbyMode(duration, characteristic) {
  var standbyModeHex = getHex(duration-1,2);
  raw(standbyModeCommandId + standbyModeHex, characteristic);
}

module.exports = standbyMode;