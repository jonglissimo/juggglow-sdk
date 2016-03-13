function effectOnEventsAll(props) {
  props.forEach(function(prop) {
    prop.effectOnEvents();
  });
}

module.exports = effectOnEventsAll;