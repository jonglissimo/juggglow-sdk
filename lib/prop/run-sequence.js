var runSequenceCommandId = require('../uuids').ballControl.runSequence;
var getHex = require('../utils/get-hex');
var raw = require('./raw');
var effectOnEvent = require('./effect-on-event');

function runSequence(options) {
  var sequenceNo = options.sequenceNo;
  var delay = options.delay;
  var characteristic = options.characteristic;

  var event = options.event;
  var permanent = options.permanent;

  var delayStart = (delay === undefined || delay === null);
  var startCondition = (!delayStart) ? '00' : '02';
  var repetitions = '00';

  sequenceNo = getHex(sequenceNo);
  delay = (delay) ? getHex(delay) : '00';
  var command = runSequenceCommandId + sequenceNo + startCondition + delay + repetitions;

  if (event) {
    effectOnEvent({
      event: event,
      permanent: permanent,
      command: command,
      characteristic: characteristic
    });
  } else {
    raw({
      command: command,
      characteristic: characteristic
    });
  }
}

module.exports = runSequence;