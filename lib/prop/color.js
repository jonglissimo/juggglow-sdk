var colorCommandId = require('../uuids').ballControl.color;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function color(color1, color2, characteristic) {
  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;

  raw(colorCommandId + color1 + color1, characteristic);
}

module.exports = color;