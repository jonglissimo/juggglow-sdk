function randomColorAll(interval, dutyCycle, mode, props) {
  props.forEach(function(prop) {
    prop.randomColor(interval, dutyCycle, mode);
  });
}

module.exports = randomColorAll;