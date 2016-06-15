function fadeAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.fade({
      colorStart: options.colorStart,
      colorEnd: options.colorEnd,
      duration: options.duration,
      mode: options.mode
    });
  });
}

module.exports = fadeAll;