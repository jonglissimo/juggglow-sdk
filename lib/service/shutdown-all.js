function shutdownAll(options) {
  var connectedProps = options.props;

  connectedProps.forEach(function(prop) {
    prop.shutdown(connectedProps);
  });
}

module.exports = shutdownAll;