function txPowerAll(options) {
  var strength = options.strength;
  var props = options.props;

  props.forEach(function(prop) {
    prop.txPower(strength);
  });
}

module.exports = txPowerAll;