function rainbowAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.rainbow({
      duration: options.duration,
      mode: options.mode
    });
  });
}

module.exports = rainbowAll;