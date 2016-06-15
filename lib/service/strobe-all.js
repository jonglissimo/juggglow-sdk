function strobeAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.strobe({
      interval: options.interval,
      dutyCycle: options.dutyCycle,
      color: options.color,
      color2: options.color2
    });
  });
}

module.exports = strobeAll;