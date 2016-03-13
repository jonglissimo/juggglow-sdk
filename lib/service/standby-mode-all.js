function standbyModeAll(duration, props) {
  props.forEach(function(prop) {
    prop.standbyMode(duration);
  });
}

module.exports = standbyModeAll;