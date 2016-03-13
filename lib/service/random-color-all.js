function randomColorAll(duration, dutyCycle, mode, props) {
  props.forEach(function(prop) {
    prop.randomColor(duration, dutyCycle, mode);
  });
}

module.exports = randomColorAll;