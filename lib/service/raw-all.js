function rawAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.raw({ command: options.command });
  });
}

module.exports = rawAll;