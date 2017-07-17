var Prop = require('../prop');
var RSVP = require('rsvp');

function connectAll(options) {
  options = options || {};
  var count = options.count;
  var race = options.race;
  var foundProps = options.foundProps;
  var connectedPropsMap = options.connectedProps;
  var bluetooth = options.bluetooth;
  var service = options.service;
  var timeout = options.timeout;
  var connectProps = [];

  foundProps.forEach(function(foundProp) {
    // if (!connectedPropsMap.exists(foundProp.uuid)) {
      connectProps.push(foundProp);
    // }
  });

  connectProps = (count && count !== 0 && count !== null) ? connectProps.slice(0,parseInt(count)) : connectProps;

  if (connectProps.length > 0) {
    var connectedProps = connectProps.map(function(prop) {
      return new Prop({
        peripheral: prop,
        bluetooth: bluetooth,
        service: service
      });
    });

    var connectPromises = connectedProps.map(function(prop) {
      return prop._connect({ timeout: timeout });
    });

    return (race) ? RSVP.race(connectPromises) : RSVP.all(connectPromises);
  } else {
    return RSVP.reject('No props to connect to');
  }
}

module.exports = connectAll;