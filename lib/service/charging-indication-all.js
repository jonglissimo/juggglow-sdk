function chargingIndicationAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.chargingIndication({ enable: options.enable });
  });
}

module.exports = chargingIndicationAll;