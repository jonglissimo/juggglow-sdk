function shutdownAll(connectedProps) {
  connectedProps.forEach(function(prop) {
    prop.shutdown(connectedProps);
  });
}

module.exports = shutdownAll;