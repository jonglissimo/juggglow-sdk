var colorCommandId = require('../uuids').ballControl.color;
var getHex = require('../utils/get-hex');

function color(color1, color2, characteristic) {
  var buf = new Buffer(10);

  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;

  buf.write(colorCommandId + color1 + color1, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING COLOR: ", error); }
  });
}

module.exports = color;