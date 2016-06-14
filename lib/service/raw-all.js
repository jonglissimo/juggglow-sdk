function rawAll(options) {
  var command = options.command;
  var props = options.props;

  props.forEach(function(prop) {
    prop.raw(command);
  });
}

module.exports = rawAll;