var debug = require('debug')('raw');

function raw(options) {
  var command = options.command;
  var characteristic = options.characteristic;
  var length = options.length || 10;

  debug('Sent raw hex data: ' + command);
  var buf = Buffer.alloc(length);
  buf.write(command, 'hex');

  try {
    characteristic.write(buf, false, function(error) {
      if (error) { console.log("ERROR WRITING BUFFER TO DEVICE: ", error); }
    });
  } catch (err) {
      console.log(err)
  }
}

module.exports = raw;