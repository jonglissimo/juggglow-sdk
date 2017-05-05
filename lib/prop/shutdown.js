var shutdownCommandId = require('../uuids').ballControl.shutdown;
var raw = require('./raw');

function shutdown(options) {
  var prop = options.prop;
  var connectedProps = options.props;
  var characteristic = options.characteristic;
  var service = options.service;

  prop._peripheral.removeListener('disconnect', prop.reconnectListener);

  raw({
    command: shutdownCommandId,
    characteristic: characteristic
  });

  connectedProps.remove(prop.uuid);

  prop.emit('shutdown', prop);
  service.emit('shutdown', prop);
}

module.exports = shutdown;