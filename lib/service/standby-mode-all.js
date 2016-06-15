function standbyModeAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.standbyMode({ minutes: options.minutes });
  });
}

module.exports = standbyModeAll;