function randomColorAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.randomColor({
      interval: options.interval,
      dutyCycle: options.dutyCycle,
      mode: options.mode
    });
  });
}

module.exports = randomColorAll;