var fadeCommandId = require('../uuids').ballControl.fade;
var getHex = require('../utils/get-hex');


function fade(colorStart, colorEnd, duration, mode, characteristic) {
  var buf = new Buffer(10);

  colorStart = getHex(colorStart);
  colorEnd = (colorEnd) ? getHex(colorEnd) : colorStart;
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration
  mode = (mode) ? getHex(mode) : '03';

  buf.write(fadeCommandId + mode + duration + colorStart + colorEnd, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR FADING COLOR: ", error); }
  });
}

module.exports = fade;