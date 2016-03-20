function rawAll(command, props) {
  props.forEach(function(prop) {
    prop.raw(command);
  });
}

module.exports = rawAll;