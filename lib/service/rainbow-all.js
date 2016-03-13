function rainbowAll(duration, mode, props) {
  props.forEach(function(prop) {
    prop.rainbow(duration, mode);
  });
}

module.exports = rainbowAll;