function removeEffectOnEventsAll(props) {
  props.forEach(function(prop) {
    prop.removeEffectOnEvents();
  });
}

module.exports = removeEffectOnEventsAll;