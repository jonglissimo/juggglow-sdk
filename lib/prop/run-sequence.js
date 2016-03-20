var runSequenceCommandId = require('../uuids').ballControl.runSequence;
var getHex = require('../utils/get-hex');
var raw = require('./raw');

function runSequence(sequenceNo, delay, characteristic) {
  var delayStart = (delay === undefined || delay === null);
  var startCondition = (!delayStart) ? '00' : '02';
  var repetitions = '00';

  sequenceNo = getHex(sequenceNo);
  delay = getHex(delay);

  raw(runSequenceCommandId + sequenceNo + startCondition + delay + repetitions, characteristic);
}

module.exports = runSequence;