function stopModeAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.stopMode({ seconds: options.seconds });
  });
}

module.exports = stopModeAll;