var txPowerCommandId = require('../uuids').ballControl.txPower;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function txPower(options) {
  var strength = options.strength;
  var characteristic = options.characteristic;

  strength = parseInt(strength);
  strength = (strength < 0 || strength > 15) ? 10 : strength;
  strength = getHex(strength);

  raw({
    command: txPowerCommandId + strength,
    characteristic: characteristic
  });
}

module.exports = txPower;