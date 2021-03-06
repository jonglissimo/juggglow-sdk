var Prop = require('../prop');
var RSVP = require('rsvp');

function connect(options) {
  var peripheral = options.peripheral;
  var bluetooth = options.bluetooth;
  var service = options.service;
  var timeout = options.timeout;

  if (peripheral) {
    var prop = new Prop({
      peripheral: peripheral,
      bluetooth: bluetooth,
      service: service
    });

    return prop._connect({ timeout: timeout });
  } else {
    return RSVP.reject('No prop to connect to');
  }
}

module.exports = connect;