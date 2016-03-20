function raw(command, characteristic) {
  console.log('COMMAND:' + command);
  var buf = new Buffer(10);
  buf.write(command, 'hex');

  characteristic.write(buf, false, function(error) {
    if (error) { console.log("ERROR WRITING BUFFER TO DEVICE: ", error); }
  });
}

module.exports = raw;