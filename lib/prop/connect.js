var uuids = require('../uuids');
var getUuids = require('../utils/get-values-for-keys');
var debug = require('debug')('prop:connect');
var debugDetail = require('debug')('prop:connect-detail');
var RSVP = require('rsvp');

var serviceUuids = getUuids(uuids.services);

// get uuid of juggglow service + characteristics
var juggglowServiceUuid = uuids.services.juggglow;
var juggglowCharacteristicUuuids = getUuids(uuids.characteristics);
var ballControlUuid = uuids.characteristics.ballControl;
var ballControlNotificationUuid = uuids.characteristics.ballControlNotification;
var ballEventNotificationUuid = uuids.characteristics.ballEventNotification;
var flashDataUuid = uuids.characteristics.flashData;
var flashControlUuid = uuids.characteristics.flashControl;

// get uuid of battery service 
var batteryServiceUuid = uuids.services.battery;
var batteryCharacteristicUuuids = getUuids(uuids.batteryCharacteristics);
var batteryCharacteristicUuid = uuids.batteryCharacteristics.batteryLevel;

// get uuid of device info service
var deviceInfoServiceUuid = uuids.services.deviceInfo;
var deviceInfoCharacteristicsUuuids = getUuids(uuids.deviceInfoCharacteristics);
var manufactureUuid = uuids.deviceInfoCharacteristics.manufacture;
var modelNoUuid = uuids.deviceInfoCharacteristics.modelNo;
var serialNoUuid = uuids.deviceInfoCharacteristics.serialNo;
var firmwareRevUuid = uuids.deviceInfoCharacteristics.firmwareRev;
var softwareRevUuid = uuids.deviceInfoCharacteristics.softwareRev;
var hardwareRevUuid = uuids.deviceInfoCharacteristics.hardwareRev

function connect (options) {
  var prop = options.prop;
  var connectedPropMap = options.connectedProps;
  var foundPropMap = options.foundProps;
  var service = options.service;
  var bluetooth = options.bluetooth;
  var peripheral = prop._peripheral;
  var timeout = options.timeout || '20';
  timeout = parseInt(timeout)*1000;

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

  var promise = new RSVP.Promise(function(resolve, reject) {
    setTimeout(function() {
      peripheral.removeAllListeners() // fixes reconnection issue after previous timeout
      reject('connection timeout');
    }, timeout);

    // connect to peripheral
    peripheral.connect(function(error) {
      if (error) { reject(error); }
      else {
        debug('CONNECTED ' + prop.uuid);

        // discover juggglow service
        peripheral.discoverServices(serviceUuids, function(error, services) {
          if (error) { reject(error); }
          else {
            var juggglowService = services.find(function(service) {
              return service.uuid == juggglowServiceUuid;
            });

            var batteryService = services.find(function(service) {
              return service.uuid == batteryServiceUuid;
            });

            var deviceInfoService = services.find(function(service) {
              return service.uuid == deviceInfoServiceUuid;
            });

            if (juggglowService) {
              debugDetail('discovered juggglow service for ' + prop.name + ' with uuid: ' + prop.uuid);
              RSVP.hash({
                juggglowCharacteristics: promiseCharacteristics(juggglowService, juggglowCharacteristicUuuids),
                batteryCharacteristics: promiseCharacteristics(batteryService, batteryCharacteristicUuuids),
                deviceInfoCharacteristics: promiseCharacteristics(deviceInfoService, deviceInfoCharacteristicsUuuids)
              }).then(function(hash) {
                var ballControl = hash.juggglowCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlUuid;
                })[0];

                var ballControlNotification = hash.juggglowCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballControlNotificationUuid;
                })[0];

                var ballEventNotification = hash.juggglowCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === ballEventNotificationUuid;
                })[0];

                var flashData = hash.juggglowCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === flashDataUuid;
                })[0];

                var flashControl = hash.juggglowCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === flashControlUuid;
                })[0];

                var batteryLevel = hash.batteryCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === batteryCharacteristicUuid;
                })[0];

                var manufacture = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === manufactureUuid;
                })[0];

                var modelNo = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === modelNoUuid;
                })[0];

                var serialNo = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === serialNoUuid;
                })[0];

                var firmwareRev = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === firmwareRevUuid;
                })[0];

                var softwareRev = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === softwareRevUuid;
                })[0];

                var hardwareRev = hash.deviceInfoCharacteristics.filter(function(characteristic) {
                  return characteristic.uuid === hardwareRevUuid;
                })[0];

                prop._characteristics.ballControl = ballControl;
                prop._characteristics.ballControlNotification = ballControlNotification;
                prop._characteristics.ballEventNotification = ballEventNotification;
                prop._characteristics.flashData = flashData;
                prop._characteristics.flashControl = flashControl;
                prop._characteristics.batteryLevel = batteryLevel;
                prop._characteristics.manufacture = manufacture;
                prop._characteristics.modelNo = modelNo;
                prop._characteristics.serialNo = serialNo;
                prop._characteristics.firmwareRev = firmwareRev;
                prop._characteristics.softwareRev = softwareRev;
                prop._characteristics.hardwareRev = hardwareRev;

                prop.color({ color: [0,0,255] });
                prop._activateEventNotifications(service);

                foundPropMap.remove(prop.uuid);
                connectedPropMap.add(prop.uuid, prop);

                service.emit('connected', prop);

                bluetooth.startScanning(); // Restart scanning for other props
                resolve(prop);
              }).catch(function(error) {
                reject(error)
              })
            }
          }
        }); // discover services
      }
    }); // connect
  });

  return promise;
}

function promiseCharacteristics(service, uuids) {
  return new RSVP.Promise(function(resolve, reject) {
    service.discoverCharacteristics(uuids, function(error, characteristics) {
      if (error) reject(error);
      resolve(characteristics);
    });
  });
}

module.exports = connect;