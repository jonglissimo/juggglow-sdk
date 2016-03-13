var randomColorCommandId = require('../uuids').ballControl.randomColor;
var getHex = require('../utils/get-hex');

function randomColor(duration, dutyCycle, mode, characteristic) {
  var buf = new Buffer(10);

  duration = getHex(duration) + '01';
  dutyCycle = getHex(dutyCycle);
  mode = (mode) ? getHex(mode) : '03';

  buf.write(randomColorCommandId + mode + duration + dutyCycle, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING randomColor: ", error); }
  });
}

module.exports = randomColor;