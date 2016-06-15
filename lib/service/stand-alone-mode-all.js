function standAloneModeAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.standAloneMode({ enable: options.enable });
  });
}

module.exports = standAloneModeAll;