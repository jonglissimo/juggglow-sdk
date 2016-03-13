var standbyModeCommandId = require('../uuids').ballControl.standbyMode;
var getHex = require('../utils/get-hex');

function standbyMode(duration, characteristic) {
  var buf = new Buffer(10);
  var standbyModeHex = getHex(duration-1,2);

  buf.write(standbyModeCommandId + standbyModeHex, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING standbyMode: ", error); }
  });
}

module.exports = standbyMode;