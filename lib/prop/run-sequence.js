var runSequenceCommandId = require('../uuids').ballControl.runSequence;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function runSequence(options) {
  var sequenceNo = options.sequenceNo;
  var delay = options.delay;
  var characteristic = options.characteristic;

  var delayStart = (delay === undefined || delay === null);
  var startCondition = (!delayStart) ? '00' : '02';
  var repetitions = '00';

  sequenceNo = getHex(sequenceNo);
  delay = (delay) ? getHex(delay) : '00';

  raw({
    command: runSequenceCommandId + sequenceNo + startCondition + delay + repetitions,
    characteristic: characteristic
  });
}

module.exports = runSequence;