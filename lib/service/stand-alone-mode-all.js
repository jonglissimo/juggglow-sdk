function standAloneModeAll(options) {
  var enable = options.enable;
  var props = options.props;

  props.forEach(function(prop) {
    prop.standAloneMode(enable);
  });
}

module.exports = standAloneModeAll;