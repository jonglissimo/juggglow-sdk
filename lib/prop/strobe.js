var strobeCommandId = require('../uuids').ballControl.strobe;
var getHex = require('../utils/get-hex');

function strobe(duration, switchPercent, color1, color2, characteristic) {
  var buf = new Buffer(10);

  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;
  duration = getHex(duration);
  switchPercent = getHex(switchPercent);

  buf.write(strobeCommandId + duration + switchPercent + color1 + color2, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING STROBE: ", error); }
  });
}

module.exports = strobe;