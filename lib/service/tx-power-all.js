function txPowerAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.txPower({ strength: options.strength });
  });
}

module.exports = txPowerAll;