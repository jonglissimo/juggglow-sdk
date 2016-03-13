function strobeAll(duration, dutyCycle, color1, color2, props) {
  props.forEach(function(prop) {
    prop.strobe(duration, dutyCycle, color1, color2);
  });
}

module.exports = strobeAll;