var Prop = require('../prop');
var RSVP = require('rsvp');

function connectAll(count, race, foundProps, connectedPropsMap, bluetooth, service) {
  var connectProps = [];

  foundProps.forEach(function(foundProp) {
    if (!connectedPropsMap.exists(foundProp.uuid)) {
      connectProps.push(foundProp);
    }
  });

  connectProps = (count && count !== 0 && count !== null) ? connectProps.slice(0,parseInt(count)) : connectProps;

  if (connectProps.length > 0) {
    var connectedProps = connectProps.map(function(prop) {
      return new Prop(prop, bluetooth, service);
    });

    var connectPromises = connectedProps.map(function(prop) {
      return prop.connect(connectedPropsMap, service);
    });

    return (race) ? RSVP.race(connectPromises) : RSVP.all(connectPromises);
  } else {
    return RSVP.reject('No props to connect to');
  }
}

module.exports = connectAll;