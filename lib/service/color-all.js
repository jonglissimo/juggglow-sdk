function colorAll(options) {
  var color = options.color;
  var color2 = options.color2;
  var props = options.props;

  props.forEach(function(prop) {
    prop.color(color, color2);
  });
}

module.exports = colorAll;