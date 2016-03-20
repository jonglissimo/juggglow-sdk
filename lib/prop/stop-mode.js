var stopModeCommandId = require('../uuids').ballControl.stopMode;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function stopMode(duration, characteristic) {
  var stopModeHex = getHex(duration-60,2);
  raw(stopModeCommandId + stopModeHex, characteristic);
}

module.exports = stopMode;