function chargingIndicationAll(options) {
  var enable = options.enable;
  var props = options.props;

  props.forEach(function(prop) {
    prop.chargingIndication(enable);
  });
}

module.exports = chargingIndicationAll;