var chargingIndicationCommandId = require('../uuids').ballControl.chargingIndication;
var raw = require('./raw');

function chargingIndication(enable, characteristic) {
  var buf = new Buffer(10);
  var enableHex = (enable) ? '05' : 'FF';

  raw(chargingIndicationCommandId + enableHex, characteristic);
}

module.exports = chargingIndication;