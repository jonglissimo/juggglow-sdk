var uuids = require('../uuids');
var getUuids = require('../utils/get-values-for-keys');
var debug = require('debug')('prop:connect');
var RSVP = require('rsvp');

// get uuid of juggglow service + characteristics
var characteristicUuids = getUuids(uuids.characteristics);
var jugglowServiceUuid = uuids.services.juggglow;
var ballControlUuid = uuids.characteristics.ballControl;
var ballControlNotificationUuid = uuids.characteristics.ballControlNotification;
var ballEventNotificationUuid = uuids.characteristics.ballEventNotification;

function connect (prop, connectedPropMap, service, bluetooth) {
  var peripheral = prop._peripheral;

  debug('Connecting ' + prop.name + ' (uuid: ' + prop.uuid + ').');

  // when disconnected, try to reconnect
  peripheral.once('disconnect', function() {
    debug('RECONNECTING ' + prop.name + '(uuid=' + prop.uuid + ')');
    connect(prop, connectedPropMap, service, bluetooth);
  });

  var promise = new RSVP.Promise(function(resolve) {
    // connect to peripheral
    peripheral.connect(function(error) {
      if (error) { console.log('ERROR: ' + error); }
      else {
        debug('CONNECTED ' + prop.uuid);

        // discover juggglow service
        peripheral.discoverServices([jugglowServiceUuid], function(error, services) {
          if (error) { console.log('ERROR: ' + error); }
          else {
            var juggglowService = services[0];

            if (juggglowService) {
              debug('discovered juggglow service for ' + prop.name + ' with uuid: ' + prop.uuid);

              // discover characteristics
              juggglowService.discoverCharacteristics(characteristicUuids, function(error, characteristics) {
                debug('discovered characteristics');

                var ballControl = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlUuid;
                })[0];

                var ballControlNotification = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlNotificationUuid;
                })[0];

                var ballEventNotification = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballEventNotificationUuid;
                })[0];

                prop._characteristics.ballControl = ballControl;
                prop._characteristics.ballControlNotification = ballControlNotification;
                prop._characteristics.ballEventNotification = ballEventNotification;

                prop.color([0,0,255]);
                prop._activateEventNotifications(service);

                connectedPropMap.add(prop.uuid, prop);

                bluetooth.startScanning(); // Restart scanning for other props
                resolve(prop);
              });
            }
          }
        }); // discover services
      }
    }); // connect
  });

  return promise;
}

module.exports = connect;