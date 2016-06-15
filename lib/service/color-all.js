function colorAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.color({
      color: options.color,
      color2: options.color2
    });
  });
}

module.exports = colorAll;