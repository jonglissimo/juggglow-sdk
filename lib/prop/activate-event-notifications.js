var eventTypes = require('../uuids').ballEventNotification;

function activateNotificationEvents(prop, characteristic, service) {
  characteristic.notify(true, function(error) {
    if (error) { console.log('ERROR: ' + error); }
  });

  characteristic.on('read', function(data) {
    var type = data.toString('hex', 0, 1);

    switch (type) {
      case eventTypes.catch:
        emitEvent('catch', prop, service); break;
      case eventTypes.throw:
        emitEvent('throw', prop, service); break;
      case eventTypes.drop:
        emitEvent('drop', prop, service); break;
      case eventTypes.idle:
        emitEvent('idle', prop, service); break;
    }
  });
}

function emitEvent(type, prop, service) {
  prop.emit(type);
  service.emit(type, prop);
}

module.exports = activateNotificationEvents;