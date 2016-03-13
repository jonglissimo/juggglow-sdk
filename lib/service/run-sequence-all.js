function runSequenceAll(sequenceNo, delay, props) {
  props.forEach(function(prop) {
    prop.runSequence(sequenceNo, delay);
  });
}

module.exports = runSequenceAll;