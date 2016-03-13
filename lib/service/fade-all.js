function fadeAll(colorStart, colorEnd, duration, mode, props) {
  props.forEach(function(prop) {
    prop.fade(colorStart, colorEnd, duration, mode);
  });
}

module.exports = fadeAll;