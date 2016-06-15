function effectOnEventAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.effectOnEvent({
      event: options.event,
      command: options.command,
      permanent: options.permanent
    });
  });
}

module.exports = effectOnEventAll;