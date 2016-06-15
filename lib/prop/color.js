var colorCommandId = require('../uuids').ballControl.color;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function color(options) {
  var color1 = options.color;
  var color2 = options.color2;
  var characteristic = options.characteristic;

  color1 = getHex(color1);
  color2 = (color2) ? getHex(color2) : color1;

  raw({
    command: colorCommandId + color1 + color2,
    characteristic: characteristic
  });
}

module.exports = color;