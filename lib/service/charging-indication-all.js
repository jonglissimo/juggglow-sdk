function chargingIndicationAll(enable, props) {
  props.forEach(function(prop) {
    prop.chargingIndication(enable);
  });
}

module.exports = chargingIndicationAll;