function standAloneModeAll(enable, props) {
  props.forEach(function(prop) {
    prop.standAloneMode(enable);
  });
}

module.exports = standAloneModeAll;