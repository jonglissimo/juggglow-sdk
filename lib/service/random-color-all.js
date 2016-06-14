function randomColorAll(options) {
  var interval = options.interval;
  var dutyCycle = options.dutyCycle;
  var mode = options.mode;
  var props = options.props;

  props.forEach(function(prop) {
    prop.randomColor(interval, dutyCycle, mode);
  });
}

module.exports = randomColorAll;