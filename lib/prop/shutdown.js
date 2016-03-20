var shutdownCommandId = require('../uuids').ballControl.shutdown;
var raw = require('./raw');

function shutdown(prop, connectedProps, characteristic) {
  raw(shutdownCommandId, characteristic);
  connectedProps.remove(prop.uuid);
}

module.exports = shutdown;