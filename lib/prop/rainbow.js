var rainbowCommandId = require('../uuids').ballControl.rainbow;
var getHex = require('../utils/get-hex');


function rainbow(duration, mode, characteristic) {
  var buf = new Buffer(10);

  mode = (mode) ? getHex(mode) : '03';
  duration = getHex(duration) + '01'; // TODO calculate step + interval from duration

  buf.write(rainbowCommandId + mode + duration, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR RAINBOW: ", error); }
  });
}

module.exports = rainbow;