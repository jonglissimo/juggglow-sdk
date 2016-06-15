function raw(options) {
  var command = options.command;
  var characteristic = options.characteristic;

  console.log('COMMAND:' + command);
  var buf = new Buffer(10);
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