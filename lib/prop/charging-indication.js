var chargingIndicationCommandId = require('../uuids').ballControl.chargingIndication;
var raw = require('./raw');

function chargingIndication(options) {
  var enable = options.enable;
  var characteristic = options.characteristic;

  var buf = new Buffer(10);
  var enableHex = (enable) ? '05' : 'FF';

  raw({
    command: chargingIndicationCommandId + enableHex,
    characteristic: characteristic
  });
}

module.exports = chargingIndication;