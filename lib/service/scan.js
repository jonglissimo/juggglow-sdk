var jugglowServiceUuid = require('../uuids').services.juggglow;
var debug = require('debug')('service:scan');
var RSVP = require('rsvp');

function scan(options) {
  var foundProps = options.foundProps;
  var bluetooth = options.bluetooth;
  var service = options.service;

  var msec = (options.seconds) ? parseInt(options.seconds,10)*1000 : 5000;

  var promise = new RSVP.Promise(function(resolve) {
    debug('Scanning for Juggglow props');
    foundProps.clear();

    if (bluetooth.state == 'poweredOn') bluetooth.startScanning();

    bluetooth.on('stateChange', function(state) {
      if (state === 'poweredOn') {
        debug('Bluetooth powered on');
        bluetooth.startScanning();
      } else {
        debug('Bluetooth powered off');
        bluetooth.stopScanning();
      }
    });

    bluetooth.on('discover', function(peripheral) {
      var uuid = peripheral.uuid;
      var serviceUuids = peripheral.advertisement.serviceUuids;
      var isJuggglow = serviceUuids.indexOf(jugglowServiceUuid) > -1;

      if (isJuggglow) {
        debug('Adding to ' + foundProps.name + ' prop with uuid: ' + uuid);
        foundProps.add(uuid, peripheral);
        service.emit('found', peripheral);
      } else {
        debug('Found non Juggglow device with uuid: ' + peripheral.uuid);
      }
    });

    setTimeout(function() {
      var keys = foundProps.getKeys().join(',');
      keys = keys.substring(0, keys.length-1);
      debug('Stopped scanning after ' + msec/1000 + ' seconds');
      debug('FOUND ' + foundProps.count() + ' Juggglow props:\n ' + keys);

      // bluetooth.stopScanning();
      resolve(foundProps.getAll());
    }, msec);
  });

  return promise;
}

module.exports = scan;