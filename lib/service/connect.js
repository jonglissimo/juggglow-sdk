var Prop = require('../prop');
var RSVP = require('rsvp');

function connect(options) {
  var peripheral = options.peripheral;
  var bluetooth = options.bluetooth;
  var service = options.service;

  if (peripheral) {
    var prop = new Prop(peripheral, bluetooth, service);
    return prop.connect(connectedPropsMap, service);
  } else {
    return RSVP.reject('No prop to connect to');
  }
}

module.exports = connect;