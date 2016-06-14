function standbyModeAll(options) {
  var minutes = options.minutes;
  var props = options.props;

  props.forEach(function(prop) {
    prop.standbyMode(minutes);
  });
}

module.exports = standbyModeAll;