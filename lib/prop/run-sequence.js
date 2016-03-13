var runSequenceCommandId = require('../uuids').ballControl.runSequence;
var getHex = require('../utils/get-hex');

function runSequence(sequenceNo, delay, characteristic) {
  var buf = new Buffer(10);
  var delayStart = (delay === undefined || delay === null);
  var startCondition = (!delayStart) ? '00' : '02';
  var repetitions = '00';

  sequenceNo = getHex(sequenceNo);
  delay = getHex(delay);

  buf.write(runSequenceCommandId + sequenceNo + startCondition + delay + repetitions, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR RUNNING SEQUENCE: ", error); }
  });
}

module.exports = runSequence;