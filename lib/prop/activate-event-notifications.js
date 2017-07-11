var eventTypes = require('../uuids').ballEventNotification;

function activateNotificationEvents(prop, ballNotificationCharacteristic, batteryLevelCharacteristic, service) {
  ballNotificationCharacteristic.notify(true, function(error) {
    if (error) { console.log('ERROR: ' + error); }
  });

  ballNotificationCharacteristic.on('read', function(data) {
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

  batteryLevelCharacteristic.notify(true, function(error) {
    if (error) { console.log('ERROR: ' + error); }
  });

  batteryLevelCharacteristic.on('read', function(data) {
    var result = data.toString('hex');
    result = parseInt(result, 16);

    prop.lastBatteryLevel = result;
    prop.emit('batteryLevel', result);
    service.emit('batteryLevel', result, prop);
  });
}

function emitEvent(type, prop, service) {
  prop.emit(type, prop);
  service.emit(type, prop);
}

module.exports = activateNotificationEvents;