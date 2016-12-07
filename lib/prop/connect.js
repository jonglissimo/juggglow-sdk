var uuids = require('../uuids');
var getUuids = require('../utils/get-values-for-keys');
var debug = require('debug')('prop:connect');
var debugDetail = require('debug')('prop:connect-detail');
var RSVP = require('rsvp');

// get uuid of juggglow service + characteristics
var characteristicUuids = getUuids(uuids.characteristics);
var jugglowServiceUuid = uuids.services.juggglow;
var ballControlUuid = uuids.characteristics.ballControl;
var ballControlNotificationUuid = uuids.characteristics.ballControlNotification;
var ballEventNotificationUuid = uuids.characteristics.ballEventNotification;
var flashDataUuid = uuids.characteristics.flashData;
var flashControlUuid = uuids.characteristics.flashControl;

function connect (options) {
  var prop = options.prop;
  var connectedPropMap = options.connectedProps;
  var foundPropMap = options.foundProps;
  var service = options.service;
  var bluetooth = options.bluetooth;
  var peripheral = prop._peripheral;

  debug('Connecting ' + prop.name + ' (uuid: ' + prop.uuid + ').');

  var reconnectListener = function() {
    debug('RECONNECTING ' + prop.name + '(uuid=' + prop.uuid + ')');

    connect({
      prop: prop,
      connectedProps: connectedPropMap,
      foundProps: foundPropMap,
      service: service,
      bluetooth: bluetooth
    });
  }

  prop.reconnectListener = reconnectListener;

  // when disconnected, try to reconnect
  peripheral.once('disconnect', reconnectListener);

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
              debugDetail('discovered juggglow service for ' + prop.name + ' with uuid: ' + prop.uuid);

              // discover characteristics
              juggglowService.discoverCharacteristics(characteristicUuids, function(error, characteristics) {
                debugDetail('discovered characteristics');

                var ballControl = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlUuid;
                })[0];

                var ballControlNotification = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlNotificationUuid;
                })[0];

                var ballEventNotification = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballEventNotificationUuid;
                })[0];

                var flashData = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === flashDataUuid;
                })[0];

                var flashControl = characteristics.filter(function(characteristic) {
                  return characteristic.uuid === flashControlUuid;
                })[0];

                prop._characteristics.ballControl = ballControl;
                prop._characteristics.ballControlNotification = ballControlNotification;
                prop._characteristics.ballEventNotification = ballEventNotification;
                prop._characteristics.flashData = flashData;
                prop._characteristics.flashControl = flashControl;

                prop.color({ color: [0,0,255] });
                prop._activateEventNotifications(service);

                foundPropMap.remove(prop.uuid);
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