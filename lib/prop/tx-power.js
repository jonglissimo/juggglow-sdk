var txPowerCommandId = require('../uuids').ballControl.txPower;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function txPower(strength, characteristic) {
  strength = parseInt(strength);
  strength = (strength < 0 || strength > 15) ? 10 : strength;
  strength = getHex(strength);

  raw(txPowerCommandId + strength, characteristic);
}

module.exports = txPower;