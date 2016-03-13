var stopModeCommandId = require('../uuids').ballControl.stopMode;
var getHex = require('../utils/get-hex');

function stopMode(duration, characteristic) {
  var buf = new Buffer(10);
  var stopModeHex = getHex(duration-60,2);

  buf.write(stopModeCommandId + stopModeHex, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING stopMode: ", error); }
  });
}

module.exports = stopMode;