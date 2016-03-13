var txPowerCommandId = require('../uuids').ballControl.txPower;
var getHex = require('../utils/get-hex');

function txPower(strength, characteristic) {
  var buf = new Buffer(10);

  strength = parseInt(strength);
  strength = (strength < 0 || strength > 15) ? 10 : strength;
  strength = getHex(strength);

  buf.write(txPowerCommandId + strength, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING txPower: ", error); }
  });
}

module.exports = txPower;