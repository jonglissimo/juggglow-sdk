function effectOnEventAll(options) {
  var event = options.event;
  var command = options.command;
  var permanent = options.permanent;
  var props = options.props;

  props.forEach(function(prop) {
    prop.effectOnEvent(event, command, permanent);
  });
}

module.exports = effectOnEventAll;