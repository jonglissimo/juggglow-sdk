var standAloneModeCommandId = require('../uuids').ballControl.standAloneMode;

function standAloneMode(enable, characteristic) {
  var buf = new Buffer(10);
  var enableHex = (enable) ? '01' : '00';

  buf.write(standAloneModeCommandId + enableHex, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING standAloneMode: ", error); }
  });
}

module.exports = standAloneMode;