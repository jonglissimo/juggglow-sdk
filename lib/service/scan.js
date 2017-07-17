var juggglowServiceUuid = require('../uuids').services.juggglow;
var debug = require('debug')('service:scan');
var RSVP = require('rsvp');
var removeAndAddListener = require('../utils/remove-and-add-listener');
var stateChangeListeners = [];
var discoverListeners = [];

function scan(options) {
  var foundProps = options.foundProps;
  var bluetooth = options.bluetooth;
  var service = options.service;

  var msec = (options.seconds) ? parseInt(options.seconds,10)*1000 : 5000;

  var promise = new RSVP.Promise(function(resolve, reject) {
    debug('Scanning for Juggglow props');
    foundProps.clear();

    if (bluetooth.state == 'poweredOn') bluetooth.startScanning();

    var listener = {
      emitter: bluetooth,
      eventName: 'stateChange',
      method: function stateChangeHandler (state) {
        if (state == 'poweredOn') {
          debug('Bluetooth powered on');
          bluetooth.startScanning();
        } else if (state == 'poweredOff') {
          debug('Bluetooth powered off');
          bluetooth.stopScanning();
          service.foundProps.clear();
          service.connectedProps.clear();
          reject('bluetooth powered off');
        } else if (state == 'unauthorized') {
          console.log('bluetooth warning: adapter state unauthorized, please run as root or with sudo.');
          console.log('For more information check the README of the bluetooth library noble at https://github.com/sandeepmistry/noble');
          reject('adapter unauthorized')
        } else if (state == 'unsupported') {
          console.log('bluetooth warning: adapter does not support Bluetooth Low Energy (BLE, Bluetooth Smart).');
          console.log('                   If you have multiple bluetooth adapters you can try to run with environment variable:');
          console.log('                   [sudo] NOBLE_HCI_DEVICE_ID=x node ...');
          reject('adapter unsupported')
        }

        service.emit('adapterState', state)
      }
    };

    removeAndAddListener(stateChangeListeners, listener);

    var discoverListener = {
      emitter: bluetooth,
      eventName: 'discover',
      method: function discoverHandler (peripheral) {
        var uuid = peripheral.uuid;
        var serviceUuids = peripheral.advertisement.serviceUuids;
        var isJuggglow = serviceUuids.indexOf(juggglowServiceUuid) > -1;

        if (isJuggglow) {
          debug('Adding to ' + foundProps.name + ' prop with uuid: ' + uuid);
          foundProps.add(uuid, peripheral);
          service.emit('found', peripheral);
        } else {
          debug('Found non Juggglow device with uuid: ' + peripheral.uuid);
        }
      }
    }

    removeAndAddListener(discoverListeners, discoverListener);

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