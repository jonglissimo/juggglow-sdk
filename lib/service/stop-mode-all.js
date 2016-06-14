function stopModeAll(options) {
  var seconds = options.seconds;
  var props = options.props;

  props.forEach(function(prop) {
    prop.stopMode(seconds);
  });
}

module.exports = stopModeAll;