function strobeAll(options) {
  var interval = options.interval;
  var dutyCycle = options.dutyCycle;
  var color = options.color;
  var color2 = options.color2;
  var props = options.props;

  props.forEach(function(prop) {
    prop.strobe(interval, dutyCycle, color1, color2);
  });
}

module.exports = strobeAll;