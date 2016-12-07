function disconnectAll(options) {
  var connectedProps = options.props;

  connectedProps.forEach(function(prop) {
    prop.disconnect();
  });
}

module.exports = disconnectAll;