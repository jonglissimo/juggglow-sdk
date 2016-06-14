function removeEffectOnEventsAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.removeEffectOnEvents();
  });
}

module.exports = removeEffectOnEventsAll;