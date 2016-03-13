function txPowerAll(strength, props) {
  props.forEach(function(prop) {
    prop.txPower(strength);
  });
}

module.exports = txPowerAll;