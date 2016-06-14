function fadeAll(options) {
  var colorStart = options.colorStart;
  var colorEnd = options.colorEnd;
  var duration = options.duration;
  var mode = options.mode;
  var props = options.props;

  props.forEach(function(prop) {
    prop.fade(colorStart, colorEnd, duration, mode);
  });
}

module.exports = fadeAll;