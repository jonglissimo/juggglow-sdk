var shutdownCommandId = require('../uuids').ballControl.shutdown;

function shutdown(prop, connectedProps, characteristic) {
  var buf = new Buffer(10);
  buf.write(shutdownCommandId, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR SETTING shutdown: ", error); }
  });

  connectedProps.remove(prop.uuid);
}

module.exports = shutdown;