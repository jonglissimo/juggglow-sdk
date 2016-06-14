function runSequenceAll(options) {
  var sequenceNo = options.sequenceNo;
  var delay = options.delay;
  var props = options.props;

  props.forEach(function(prop) {
    prop.runSequence(sequenceNo, delay);
  });
}

module.exports = runSequenceAll;