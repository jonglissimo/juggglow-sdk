function rainbowAll(options) {
  var duration = options.duration;
  var mode = options.mode;
  var props = options.props;

  props.forEach(function(prop) {
    prop.rainbow(duration, mode);
  });
}

module.exports = rainbowAll;