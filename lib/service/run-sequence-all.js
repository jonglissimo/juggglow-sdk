function runSequenceAll(options) {
  var props = options.props;

  props.forEach(function(prop) {
    prop.runSequence({
      sequenceNo: options.sequenceNo,
      delay: options.delay
    });
  });
}

module.exports = runSequenceAll;