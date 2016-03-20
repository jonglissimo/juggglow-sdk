function strobeAll(interval, dutyCycle, color1, color2, props) {
  props.forEach(function(prop) {
    prop.strobe(interval, dutyCycle, color1, color2);
  });
}

module.exports = strobeAll;