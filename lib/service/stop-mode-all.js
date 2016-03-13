function stopModeAll(duration, props) {
  props.forEach(function(prop) {
    prop.stopMode(duration);
  });
}

module.exports = stopModeAll;