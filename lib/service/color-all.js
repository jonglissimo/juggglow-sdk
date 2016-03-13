function colorAll(color1, color2, props) {
  props.forEach(function(prop) {
    prop.color(color1, color2);
  });
}

module.exports = colorAll;